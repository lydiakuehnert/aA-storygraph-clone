import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";
import "./ReviewPost.css";
import { getBookThunk } from "../../store/books";
import { useState } from "react";

export default function ReviewPost({ book }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [input, setInput] = useState("");
    const [rating, setRating] = useState("");
    const [activeRating, setActiveRating] = useState(rating);
    const [errors, setErrors] = useState({})
    const sessionUser = useSelector(state => state.session.user);

    const bookId = book.id;

    const handleSubmit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (input.length < 1) validationErrors.review = 'Please provide a valid review'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload = {
            review: input,
            stars: rating
        }
        try {
            await dispatch(createReviewThunk({bookId, payload}))
            await dispatch(getBookThunk(bookId))
            setErrors({})
            closeModal()
        } catch (error) {
            console.error('Error editing review:', error)
        }
    }

    return (
        <div className="review-modal">
            <h2>Did you enjoy this book?</h2>
            {Object.values(errors).length > 0 && <p className="errors">{errors.review}</p>}
            <div className="rating-input">
                <div onMouseEnter={() => setActiveRating(1)}
                    onMouseLeave={() => setActiveRating(rating)}
                    onClick={() => setRating(1)}>
                    {activeRating > 0 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                </div>
                <div onMouseEnter={() => setActiveRating(2)}
                    onMouseLeave={() => setActiveRating(rating)}
                    onClick={() => setRating(2)} >
                    {activeRating > 1 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                </div>
                <div onMouseEnter={() => setActiveRating(3)}
                    onMouseLeave={() => setActiveRating(rating)}
                    onClick={() => setRating(3)}>
                    {activeRating > 2 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                </div>
                <div onMouseEnter={() => setActiveRating(4)}
                    onMouseLeave={() => setActiveRating(rating)}
                    onClick={() => setRating(4)}>
                    {activeRating > 3 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                </div>
                <div onMouseEnter={() => setActiveRating(5)}
                    onMouseLeave={() => setActiveRating(rating)}
                    onClick={() => setRating(5)}>
                    {activeRating > 4 ? <i className="fa-solid fa-star"></i> : <i className="fa-regular fa-star"></i>}
                </div>
            </div>
            <textarea
                type="text"
                placeholder="Write your review here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSubmit} disabled={input.length < 1 || rating < 1} className="submit-button">Submit your review</button>
        </div>
    )
}