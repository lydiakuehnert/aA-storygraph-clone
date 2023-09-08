import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooksThunk } from "../../store/books";
import BookCard from "../BookCard";
import "./AllBooks.css"

export default function AllBooks() {
    const dispatch = useDispatch();

    const booksObj = useSelector(state => state.books.allBooks);
    const books = Object.values(booksObj)

    useEffect(() => {
        dispatch(getBooksThunk())
    }, [dispatch])

    return (
        <>
            <div className="all-books">
                {books.length > 0 && books.map(book => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </>
    )
}
