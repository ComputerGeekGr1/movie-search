/* ======================================================
    Lab 8 - App.jsx starter
====================================================== */

import React, { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import MovieGrid from "./components/MovieGrid.jsx";

export default function App() {
  //  3: 
  // Create state variables using useState: 
  // - movies: empty array 
  // - isLoading: true 
  // - error: empty string 
  // - searchTerm: "Batman" 
  // - watchlist: empty array 

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [watchlist, setWatchlist] = useState([])

  const API_KEY = "ENTER_OMDB_API_KEY_HERE";


  const fetchMovies = async (query) => {
    //  4: 
    // Before fetching: 
    // - set isLoading to true 
    // - clear the error message 

    setIsLoading(true);
    setError('');

    if (!API_KEY || API_KEY === "ENTER_OMDB_API_KEY_HERE" ) {
      // Makes movies empty such as setMovies([]) 
      // Call setError with your error message such as “No API key” 
      // Set isLoading to false; 
      setMovies([]);
      setError("No OMDB API key provided! (is it in the env?)");
      setIsLoading(false);
      return;
    }

    try {
      const url =
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${API_KEY}`;

      // console.log("Fetching: ", query)
      const response = await fetch(url);
      const data = await response.json();

      // console.log("Response: ", data)

      //  5: 
      // If data.Response is True, store data.Search in movies, use setMovies. 
      // Otherwise: 
      // - set movies to [] (like  4) 
      // - set error to data.Error or “No movies found” 

      if (data.Response === "True") {
        setMovies(data.Search)
      } else {
        setMovies([]);
        setError(data.Error ?? "No movies found")
      }

    } catch (err) {
      //  6: 
      // Set error to "Failed to fetch movies." 
      // Set movies to [] 
      //console.error("Failed to fetch movies: ", err)
      setError("Failed to fetch movies");
      setMovies([]);

    } finally {
      //  7: 
      // Set isLoading to false  
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //  8: 
    // Call fetchMovies with searchTerm 
    // This should run on first load and when searchTerm changes. 

    if (searchTerm != '') {
      fetchMovies(searchTerm);
    }

  }, [searchTerm]);

  const handleSearch = (newSearchTerm) => {
    //  9: 
    // Update searchTerm using the value received from SearchBar. 
    // Do not call fetchMovies directly here. 

    setSearchTerm(newSearchTerm);
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      const alreadyExists = prevWatchlist.some(
        (item) => item.imdbID === movie.imdbID
      );
      if (alreadyExists) {
        return prevWatchlist;
      }
      return [...prevWatchlist, movie];
    });
  };

  return (
    <div className="page">
      <Header title="Movie Search" searchTerm={searchTerm} />

      {/*  10: 
          Render SearchBar and pass handleSearch as onSearch
      */}
      <SearchBar
        onSearch={handleSearch}
      />

      <main className="panel">
        {/*  11A: 
            Conditional rendering: 
            - If isLoading is true, show <p className="status">Loading...</p> 
            - Else if error is not empty, show <p className="status error">{error}</p> 
            - Else if movies.length === 0, show 
              <p className="status">No movies found.</p> 
            - Otherwise render <MovieGrid movies={movies} addToWatchlist={addToWatchlist} /> 
        */}

        {isLoading ? (
          <p className="status">Loading...</p>
        ) : error != '' ? (
          <p className="status error">{error}</p>
        ) : movies.length === 0 ? (
          <p className="status">No movies found.</p>
        ) :

          <MovieGrid movies={movies} addToWatchlist={addToWatchlist} />
        }


        {/*  11B: 
            Add a watchlist section below the search results. 
            - Show a heading such as "My Watchlist" 
            - If watchlist.length === 0, show "No movies in watchlist yet." 
            - Otherwise map through watchlist and render each saved movie 
        */}

        <section>
          <h2>My Watchlist</h2>

          {watchlist.length === 0 ? (
            <p className="status">No movies in watchlist yet.</p>
          ) : (
            <MovieGrid
              movies={watchlist}
            />
          )}
        </section>




      </main>
    </div>
  );
}