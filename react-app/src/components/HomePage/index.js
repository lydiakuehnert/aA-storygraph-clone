import { NavLink } from "react-router-dom/cjs/react-router-dom.min";


export default function HomePage() {

    return (
        <>
            <div className="home-left">
                <i class="fa-solid fa-book-open-reader"></i>
                <div>
                    <h4>The</h4>
                    <h1>PorchStory</h1>
                    <h3>Because reading your favorite book on the front porch on a crisp fall day is almost heaven</h3>
                    <div>
                        <NavLink exact to="/signup">Sign Up</NavLink>
                        <NavLink exact to="/login">Sign In</NavLink>
                    </div>
                </div>
            </div>
            <div className="home-right">
                <img src="https://www.thestorygraph.com/assets/hero-image-9daf4eae0b6f8e9beb51f83fd4a99631698ca1c8c68ef07a1aae37ef8a477dd1.jpg"></img>
                <NavLink exact to="/books">Browse Books</NavLink>
            </div>
        </>
    )
}