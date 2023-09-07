const GET_BOOKS = "books/getBooks";
const GET_BOOK = "books/getBook";
const CREATE_BOOK = "books/createBook";
const GET_USER_BOOKS = "books/getUserBooks";
const DELETE_BOOK = "books/deleteBook";
const EDIT_BOOK = "books/editBook";



const getBookAction = (book) => {
    return {
        type: GET_BOOK,
        book
    }
}

const getBooksAction = (books) => {
    return {
        type: GET_BOOKS,
        books
    }
};

const createBookAction = (book) => {
    return {
        type: CREATE_BOOK,
        book
    }
}


const deleteBookAction = (bookId) => {
    return {
        type: DELETE_BOOK,
        bookId
    }
}

const editBookAction = (book) => {
    return {
        type: EDIT_BOOK,
        book
    }
}



export const getSearchedBooksThunk = (query) => async dispatch => {
    const res = await fetch(`/api/books/search?=${query}`)

    if (res.ok) {
        console.log(res)
        const books = await res.json();
        console.log(books)
        dispatch(getBooksAction(books))
    }
}

export const getBookThunk = (bookId) => async dispatch => {
    const res = await fetch(`/api/books/${bookId}`);

    if (res.ok) {
        const book = await res.json()
        dispatch(getBookAction(book))
    }
}

export const getBooksThunk = () => async dispatch => {
    const res = await fetch('/api/books')

    if (res.ok) {
        const books = await res.json();
        dispatch(getBooksAction(books))
    }
};

export const getLikedBooksThunk = () => async dispatch => {
    try {
        const res = await fetch('/api/likes')

        if (res.ok) {
            const books = await res.json();
            dispatch(getBooksAction(books))
            console.log(books)
        }
    }
    catch (e) {
        const data = await e.json()
        return data;
    }
};


export const createBookThunk = (book, user) => async dispatch => {
    const res = await fetch('/api/books/add', {
        method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(book)
        body: book
    })

    if (res.ok) {
        if (!user) throw new Error('Please log in to create a book')
        const newBook = await res.json();
        dispatch(createBookAction(newBook))
        return newBook;
    }
}

export const deleteBookThunk = (bookId) => async dispatch => {
    const res = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (res.ok) {
        dispatch(deleteBookAction(bookId))
    }
}

export const editBookThunk = (book, bookId) => async dispatch => {
    const res = await fetch(`/api/books/${bookId}`, {
        method: 'PUT',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(book)
        body: book
    })

    if (res.ok) {
        const book = await res.json();
        dispatch(editBookAction(book))
        return book;
    }
}


const initialState = { allBooks: {}, singleBook: {}};

const bookReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_BOOKS: {
            newState = { ...state, allBooks: {}, singleBook: {} }
            action.books.forEach(book => newState.allBooks[book.id] = book)
            return newState
        }
        case GET_BOOK: {
            newState = { ...state, allBooks: { ...state.allBooks }, singleBook: {} }
            newState.singleBook = action.book;
            return newState;
        }
        case CREATE_BOOK: {
            newState = { ...state, allBooks: { ...state.allBooks }, singleBook: {} }
            newState.allBooks[action.book.id] = action.book;
            newState.singleBook = action.book;
            return newState
        }
        case GET_USER_BOOKS: {
            newState = { ...state, allBooks: {}, singleBook: {} }
            action.books.forEach(book => newState.allBooks[book.id] = book)
            return newState
        }
        case DELETE_BOOK: {
            newState = { ...state, allBooks: { ...state.allBooks }, singleBook: {} }
            delete newState.allBooks[action.bookId]
            return newState
        }
        case EDIT_BOOK: {
            newState = { ...state, allBooks: { ...state.allBooks }, singleBook: {} }
            newState.allBooks[action.book.id] = action.book;
            newState.singleBook = action.book;
            return newState;
        }
        default:
            return state;
    }
};

export default bookReducer;