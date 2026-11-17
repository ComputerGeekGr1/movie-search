/* ======================================================
    Lab 8 - SearchBar.jsx starter
====================================================== */

import React, { useState } from "react";
import "../App.css";

export default function SearchBar({ onSearch }) {
    //  13: 
    // Create local state variable inputValue initialized to "" 

    const [inputValue, setInputValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();

        //  14: 
        // If inputValue.trim() is not empty: 
        // - call onSearch with inputValue.trim() 
        // - clear the input by setting inputValue to "" 

        if (inputValue.trim() !== "") {
            onSearch(inputValue.trim());
            setInputValue("")
        }

    };

    return (
        <form className="searchForm" onSubmit={handleSubmit}>
            {/*  15: 
                Create a controlled input: 
                - value should be inputValue 
                - onChange should update inputValue 
                - add a helpful placeholder
            */}

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Search Movies..."
                />

            <button type="submit" className="primary">Search Movies</button>
        </form>
    );
}