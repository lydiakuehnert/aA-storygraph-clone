import { useState } from "react";
import { useHistory } from "react-router-dom";
import './Navigation.css';

export default function SearchBar() {
    const history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/books/search?=${searchTerm}`)
    }

    return (
        <div>
            <form id="search-bar-box" onSubmit={handleSubmit}>
                <input
                    className="search-input"
                    type='search'
                    placeholder='Search for book title...'
                    size='40'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </form>
        </div>
    )
}