import { useEffect, useState } from "react";

const KEY = "c5da4c73";


const useMovies = (query) => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // callback?.();
        const controller = new AbortController();

        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                setError("");
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

                if (!res.ok)
                    throw new Error("Something went wrong with fetching movies")


                const data = await res.json();
                if (data.Response === "False") {
                    throw new Error("Movie Not Found")
                }
                setMovies(data.Search);
            }
            catch (error) {
                setError(error.message);

                if (error.name !== "AbortError") {
                    console.log(error.message);
                    setError(error.message)
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (!query.length) {
            setMovies([]);
            setError("");
            return;
        }
        // handleCloseMovie();
        fetchMovies();
        return function () {
            controller.abort();
        }
    }, [query])

    return { movies, isLoading, error }
}

export default useMovies;