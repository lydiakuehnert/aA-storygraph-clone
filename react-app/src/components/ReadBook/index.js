import { useDispatch } from "react-redux";
import { createReadThunk } from "../../store/session";
import { useParams } from "react-router-dom";

export default function ReadBook({ changeRead }) {
    const dispatch = useDispatch()
    const { bookId } = useParams()
    const handleClick = async (e) => {
        e.preventDefault()
        await dispatch(createReadThunk(bookId))
        changeRead()
    }
    return (
        <button onClick={handleClick}>Done Reading</button>
        // <button onClick={handleClick}
        //     title="Like"
        //     class="fa-solid fa-heart" />
    )
}
