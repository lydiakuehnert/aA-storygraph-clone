import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBookThunk } from "../../store/books";
import OpenModalButton from "../OpenModalButton";
import ReviewPost from "../ReviewPost";
import BookReviews from "../BookReviews";
import "./OneBook.css"


export default function OneBook() {
    const { bookId } = useParams();
    const [hideDes, setHideDes] = useState(true)

    const dispatch = useDispatch();

    const book = useSelector(state => state.books.singleBook);
    const user = useSelector(state => state.session.user)
  

    useEffect(() => {
        dispatch(getBookThunk(bookId))
    }, [dispatch])

    const changeDes = () => {
        if (hideDes) setHideDes(false)
        else setHideDes(true)
    }


    if (!book) return null;
    if (!book.id) return null;

    return (
        <div className="book-detail-page">
            <div className="all-book-details">
                <div className="book-image-box">
                        <img src={book.picture}></img>
                </div>
                <div className="book-details">
                    <h1>{book.title}</h1>
                    <h2>{book.author}</h2>
                    <div id="book-detail-nums">
                        <p>{book.pageNum} pages</p>
                        <p> &nbsp; ·  &nbsp; </p>
                        <p>Published: {book.yrPublished}</p>
                    </div>
                    <h4>{book.genre}</h4>

                    {hideDes ? 
                    <div id="book-des-div">
                        <h3>DESCRIPTION</h3>
                        <p>{book.description.substr(0, book.description.lastIndexOf(' ', 500))}...</p>
                        <button onClick={changeDes}>READ MORE</button>
                    </div> :
                    <div id="book-des-div">
                        <h3>DESCRIPTION</h3>
                        <p>{book.description}</p>
                        <button onClick={changeDes}>READ LESS</button>
                    </div>}
                </div>
                <div>
                    {user && (user.id !== book.user.id) ? <OpenModalButton
                        buttonText="Add a review"
                        modalProps={{ hAlign: "right", className: "modal-create-review" }}
                        modalComponent={<ReviewPost book={book} /> } /> : <></>}
                </div>
            </div>
            <h2>Community Reviews <i className="fa-solid fa-star"></i> {book.avgRating.toFixed(1)}</h2>
            <div className="review-detail-box">
                <BookReviews book={book} />
            </div>
        </div>
    )
}