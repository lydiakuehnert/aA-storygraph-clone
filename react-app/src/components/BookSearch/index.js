import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSearchedBooksThunk } from "../../store/books";
import BookCard from "../BookCard";
import "./BookSearch.css"

export default function BookSearch() {
    const dispatch = useDispatch();
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const searched = query.get('')

    const books = useSelector(state => Object.values(state.books.allBooks));

    useEffect(() => {
        dispatch(getSearchedBooksThunk(searched))
    }, [dispatch, searched])

    return (
        <div className="all-books">
            {books.length > 0 ? (
                books.map((book) => <BookCard key={book.id} book={book} />
                )) : (
                <>
                    <div className="no-books-index">
                        <h1>NO BOOKS FOUND</h1>
                        <div className="no-books-subtext">
                            <p>Sorry, we didn't find any results for "{searched.toLowerCase()}".</p>
                            <p>Check the spelling, or try a different search.</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
