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

            <div className="book-details">
                <NavLink className="book-card-link" exact to={`/books/${book.id}`}>
                    <h2 className="book-title">{book.title}</h2>
                </NavLink>
                <h3 className="author-name">{book.author}</h3>
                <div>
                    <p>{book.pageNum} pages</p>
                    <p>Published: {book.yrPublished}</p>
                </div>
                <p>{book.genre}</p>
            </div>
        </div>
    )
}