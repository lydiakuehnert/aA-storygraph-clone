import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksThunk } from "../../store/books";
import BookCard from "../BookCard";
import BookDelete from "../BookDelete";
import BookEdit from "../BookEdit";
import OpenModalButton from "../OpenModalButton";
import './UserBooks.css'

export default function UserBooks() {
    const dispatch = useDispatch();

    const booksObj = useSelector(state => state.books.allBooks);
    const user = useSelector(state => state.session.user)
    const books = Object.values(booksObj).filter(book => book.user?.id === user.id)

    useEffect(() => {
        dispatch(getBooksThunk())
    }, [dispatch])

    return (
        <>
            <div className="index">
                <div className="all-user-books">
                    {books.length > 0 && books.map(book => (
                        <>
                            <div className="user-book-button-container">
                                <BookCard key={book.id} book={book} />
                                <div className="user-book-buttons">
                                    {user && user.id === book.user.id && <OpenModalButton
                                        buttonClass='button-white'
                                        buttonText='Delete your book'
                                        modalComponent={<BookDelete bookId={book.id} />}
                                    />}
                                    {user && user.id === book.user.id && <OpenModalButton
                                        buttonClass='button-white'
                                        buttonText='Edit your book'
                                        modalComponent={<BookEdit bookId={book.id} />}
                                    />}
                                </div>
                            </div>
                        </>
                    ))}

                </div>
            </div>
        </>
    )
}
