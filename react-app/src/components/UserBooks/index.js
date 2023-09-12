import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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
    
    
    
    useEffect(() => {
        dispatch(getBooksThunk())
    }, [dispatch])
    
    if (!user) return <Redirect to="/books" />;
    const books = Object.values(booksObj).filter(book => book.user?.id === user.id)

    return (
        <>
            <div className="index">
                <div className="all-user-books">
                    {!books.length && <h3>You have no books. Try adding a book!</h3>}
                    {books.length > 0 && books.map(book => (
                        <>
                            <div className="user-book-button-container">
                                <BookCard key={book.id} book={book} />
                                <div className="user-book-buttons">
                                    {user && user.id === book.user.id && <OpenModalButton
                                        buttonClass='button-user-books'
                                        buttonText='Delete your book'
                                        modalProps={{ hAlign: "left" }}
                                        modalComponent={<BookDelete bookId={book.id} />}
                                    />}
                                    {user && user.id === book.user.id && <OpenModalButton
                                        buttonClass='button-user-books'
                                        buttonText='Edit your book'
                                        modalProps={{ hAlign: "left" }}
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
