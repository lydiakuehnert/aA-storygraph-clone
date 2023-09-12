import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import './HomePage.css';


export default function HomePage() {

    return (
        <div className="home-box">
            <div className="home-left">
                <div className="home-icon">
                    <i class="fa-solid fa-book-open-reader"></i>
                </div>
                <div className="home-middle">
                    <h3>The</h3>
                    <h1>PorchStory</h1>
                    <h2>Because reading your favorite book on the front porch on a crisp fall day is almost heaven.</h2>
                    <div>
                        <NavLink id="home-signup" exact to="/signup">Sign up</NavLink>
                        <NavLink id="home-login" exact to="/login">Sign in</NavLink>
                    </div>
                </div>
            </div>
            <div className="home-right">
                <img src="https://www.thestorygraph.com/assets/hero-image-9daf4eae0b6f8e9beb51f83fd4a99631698ca1c8c68ef07a1aae37ef8a477dd1.jpg"></img>
                <NavLink className="home-books" exact to="/books">Browse Books</NavLink>
            </div>
        </div>
    )
}