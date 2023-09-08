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
    const [errors, setErrors] = useState({})
    const sessionUser = useSelector(state => state.session.user);


    const handleEdit = async (e) => {
        e.preventDefault()
        let validationErrors = {}

        if (input.length < 1) validationErrors.review = 'Please provide a valid review'

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        const payload = {
            id: review.id,
            review: input,
            book_Id: bookId,
            user_Id: sessionUser.id
        }
        try {
            await dispatch(editReviewThunk(payload))
            await dispatch(getBookThunk(bookId))
            dispatch(getBookThunk(bookId))
            setErrors({})
            closeModal()
        } catch (error) {
            console.error('Error editing review:', error)
        }
    }

    return (
        <div className="edit-modal">
            <h2>Edit Review</h2>
            {Object.values(errors).length > 0 && <p className="errors">{errors.review}</p>}
            <textarea
                type="text"
                placeholder="Write a review"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleEdit} className="edit-button">Edit Review</button>
            <button onClick={closeModal} className="cancel-button">Cancel</button>
        </div>
    )
}