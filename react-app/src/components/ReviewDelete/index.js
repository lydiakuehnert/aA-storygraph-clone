import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk } from "../../store/reviews";
import "./ReviewDelete.css";
import { getBookThunk } from "../../store/books";

export default function ReviewDelete({ review, bookId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();


    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteReviewThunk(review.id))
        await dispatch(getBookThunk(bookId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Do you really want to remove this review?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Review)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Review)</button>
        </div>
    )
}