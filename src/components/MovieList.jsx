import { useState } from "react";
import Movie from "./Movie";

const MovieList = ({ movies }) => {

    return (
        <ul className="list overflow-hidden">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

export default MovieList;