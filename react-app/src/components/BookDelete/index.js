import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteBookThunk } from "../../store/books";
import './BookDelete.css';

export default function BookDelete({ bookId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteBookThunk(bookId))
        closeModal()
    }

    return (
        <div className="delete-book-modal">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to remove this book? This action is permanent.</p>
            <button onClick={handleDelete} className="yes-delete-button">Yes (Delete Book)</button>
            <button onClick={closeModal} className="no-delete-button">Cancel (Keep Book)</button>
        </div>
    )
}