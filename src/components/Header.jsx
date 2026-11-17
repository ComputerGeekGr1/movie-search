/* ======================================================
    Lab 8 - Header.jsx starter
====================================================== */
import "../App.css";

export default function Header({ title, searchTerm }) {
    /*  12: Create the entire Header component.
    
       Requirements:
        - Show the title prop in an h1
        - Show a one-sentence description
        - Show the current search term somewhere in the header
        - Replace return null with your JSX
    */

    return (
        <div className="hero">

            <h1>
                {title}
            </h1>

            <h2 className="heroMeta">
                Search your movies and put them in your watchlist, which you tell yourself you'll watch someday and never do!
            </h2>

            <p>
                Searching for: {searchTerm}
            </p>

        </div>

    )
}