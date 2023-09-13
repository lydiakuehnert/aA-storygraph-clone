import "./UserBookCard.css";
import { NavLink } from 'react-router-dom';


export default function UserBookCard({ book }) {

    if (!book) return null;


    return (
        <div title={book.name} className="user-book-card">

            <div className="card-image">
                <NavLink className="book-card-link" exact to={`/books/${book.id}`}>

                    <img src={book.picture} alt="book cover"></img>
                </NavLink>

            </div>

            <div className="book-card-details">
                <NavLink className="book-card-link" exact to={`/books/${book.id}`}>
                    <h2 className="book-title">{book.title}</h2>
                </NavLink>
                <h3 id="author-name">{book.author}</h3>
                <div className="book-card-pages">
                    <p>{book.pageNum} pages</p>
                    <p> &nbsp; ·  &nbsp; </p>
                    <p>Published: {book.yrPublished}</p>
                </div>
                <p id="book-card-genre">{book.genre}</p>
            </div>
        </div>
    )
}