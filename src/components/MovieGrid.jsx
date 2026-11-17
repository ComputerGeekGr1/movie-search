/* ======================================================
    Lab 8 - MovieGrid.jsx starter
====================================================== */

import MovieCard from "../MovieCard.jsx";
import "../App.css"

// Adding the null lets me reuse it for the watchlist, without the 'add to watchlist' button existing. 
export default function MovieGrid({ movies, addToWatchlist = null }) {
    return (
        <div className="grid">
            {/*  16: 
                Render MovieCard for each movie:
                - you can use map use key={movie.imdbID} and pass movie as a prop
                - you can also pass addToWatchlist={addToWatchlist} 
            */}

            {movies.map((movie) =>
                <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    addToWatchlist={addToWatchlist}
                />
            )}


        </div>
    );
} 