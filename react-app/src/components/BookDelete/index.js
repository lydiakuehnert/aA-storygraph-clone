import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookThunk } from "../../store/books";

export default function BookDelete({ bookId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteBookThunk(bookId))
        closeModal()
    }

    return (
        <div className="delete-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this book?</p>
            <button onClick={handleDelete} className="yes-button">Yes (Delete Book Permanently)</button>
            <button onClick={closeModal} className="no-button">Cancel (Keep Book)</button>
        </div>
    )
}