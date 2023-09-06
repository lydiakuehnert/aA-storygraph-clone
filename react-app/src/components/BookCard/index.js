import "./BookCard.css";
import { NavLink } from 'react-router-dom';


export default function BookCard({ book }) {

    if (!book) return null;


    return (
        <div title={book.name} className="book-card">

            <div className="card-image">
                <NavLink className="book-card-link" exact to={`/books/${book.id}`}>

                    <img src={book.picture} alt="book cover"></img>
                </NavLink>

            </div>
            <NavLink className="book-card-link" exact to={`/books/${book.id}`}>

                <div className="book-details">
                    <p className="book-title">{book.title}</p>
                    <p className="author-name">{book.author}</p>
                </div>
            </NavLink>
        </div>
    )
}