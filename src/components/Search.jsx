import { useEffect, useState } from "react";

const Search = ({ query, setQuery }) => {
    useEffect(() => {
        const el = document.querySelector('.search');
        el.focus();
    }, [])

    return (
        <input
            className="search"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
        />
    );
}

export default Search;