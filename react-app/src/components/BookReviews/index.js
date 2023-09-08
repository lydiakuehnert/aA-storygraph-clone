import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
// import ReviewPost from "../ReviewPost";
import OpenModalButton from "../OpenModalButton";
import ReviewDelete from "../ReviewDelete";
import ReviewEdit from "../ReviewEdit";
import "./BookReviews.css";

export default function BookReviews({ book }) {

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const reviewsObj = useSelector(state => state.reviews.book);
    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getReviewsThunk(book.id))
    }, [dispatch, book.id])

    if (!reviews) return <p>Loading...</p>;
    if (!book) return <p>Loading...</p>;
    if (!book.user) return <p> Loading...</p>;

    return (
        <div className="book-reviews">
            {/* {sessionUser && (sessionUser.id !== book.user.id) ? <ReviewPost book={book} /> : <></>} */}
            {sessionUser && !reviews.length && sessionUser.id !== book.user.id &&
                <div id="noReview"><h4>Be the first to post a review!</h4></div>}
            {reviews.length > 0 && reviews.slice().reverse().map(review => {
                const year = review.date.split(" ")[3]
                const date = review.date.split(" ")[1]
                const month = review.date.split(" ")[2]

                return (
                    <div key={review.id} className="one-review-box">
                        <h4>{review.user && review.user.username}</h4>
                        <h5>
                            {month} {date}, {year}
                        </h5>
                        <p>{review.review}</p>
                        <div className="review-buttons">
                            <div id='editbtn'>
                                {sessionUser && sessionUser.id === review.user.id && <OpenModalButton
                                    buttonText="Edit"
                                    modalComponent={<ReviewEdit review={review} bookId={book.id} />}
                                />}
                            </div>
                            <div id='deletebtn'>
                                {sessionUser && sessionUser.id === review.user.id && <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<ReviewDelete review={review} bookId={book.id} />}
                                />}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}