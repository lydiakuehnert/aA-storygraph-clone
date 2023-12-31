import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editReviewThunk } from "../../store/reviews";
import "./ReviewEdit.css";
import { getBookThunk } from "../../store/books";
import { useState } from "react";

export default function ReviewEdit({ review, bookId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [input, setInput] = useState(review.review);
    const [rating, setRating] = useState(review.stars);
    const [activeRating, setActiveRating] = useState(rating);
    const [errors, setErrors] = useState({})
    const sessionUser = useSelector(state => state.session.user);


    const handleEdit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (input.length < 10) validationErrors.review = 'Please provide a valid review'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload = {
            id: review.id,
            review: input,
            stars: rating,
            book_id: bookId,
            user_id: sessionUser.id
        }
        try {
            await dispatch(editReviewThunk(payload))
            await dispatch(getBookThunk(bookId))
            setErrors({})
            closeModal()
        } catch (error) {
            console.error('Error editing review:', error)
        }
    }

    return (
        <div className="edit-review-modal">
            <h2>Do you want to change your review?</h2>
            <p>(Must include star rating and at least 10 characters to submit your review.)</p>
            {Object.values(errors).length > 0 && <p className="errors">{errors.review}</p>}
            <div className="edit-rating-input">
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
                placeholder="Update your review"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleEdit} disabled={input.length < 10 || rating < 1} className="edit-button">Edit your review</button>
            <button onClick={closeModal} className="cancel-button">Cancel</button>
        </div>
    )
}