import { useDispatch } from "react-redux";
import { deleteReadThunk } from "../../store/session";
import { useParams } from "react-router-dom";

export default function ReadBookNot({ changeRead }) {
    const dispatch = useDispatch()
    const { bookId } = useParams()
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(deleteReadThunk(bookId))
        changeRead()
    }
    return (
        <button onClick={handleClick}>Have Not Read</button>
        // <button onClick={handleClick}
        //     title="Unlike"
        //     class="fa-solid fa-heart-broken" />
    )
}
