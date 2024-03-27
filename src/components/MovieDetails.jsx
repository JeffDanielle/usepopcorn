import { useState } from "react";
import { useEffect } from "react";
import StarRating from "./StarRating"

const KEY = "c5da4c73";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatch, watched }) => {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState('');
    // const [myTitle, setMyTitle] = useState('');
    const isWatched = watched.map((item) => item.imdbID).includes(selectedId);
    const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;
    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre
    } = movie

    const handleAdd = () => {
        const newWatchMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating,
        }

        onAddWatch(newWatchMovie)
        onCloseMovie();
        // setUserRating("")
    };

    useEffect(() => {
        const callBack = () =>
            document.addEventListener("keydown", (e) => {
                if (e.code === "Escape") {
                    onCloseMovie()
                }
            });

        document.addEventListener('keydown', callBack);

        return () => {
            document.removeEventListener('keydown', callBack)
        }
    }, [onCloseMovie])

    useEffect(() => {
        const getMovieDetails = async () => {
            setIsLoading(true);
            const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

            const data = await res.json()
            setMovie(data);
            setIsLoading(false);
        }

        getMovieDetails()

    }, [selectedId])

    // useEffect(() => {
    //     document.title = "TEST";
    // }, [])






    return (
        <div className="details" >
            {isLoading ? <p className="loader">Loading...</p> :
                <>
                    <header>
                        <button className="btn-back" onClick={onCloseMovie}>
                            &larr;
                        </button>
                        <img src={poster} alt={`Poster of ${movie} movie`} />
                        <div className="details-overview">
                            <h2>
                                {title}
                            </h2>
                            <p>
                                {released} &bull; {runtime}
                            </p>
                            <p>{genre}</p>
                            <p><span>⭐</span>{imdbRating} IMdb rating</p>
                        </div>
                    </header>
                    <section>
                        {!isWatched ?
                            <>
                                <div className="rating">
                                    <StarRating maxRating={10} size={24} onSet={setUserRating} />
                                    {userRating > 0 && <button className="btn-add" onClick={handleAdd}>
                                        + Add to list
                                    </button>}
                                </div>
                            </> :
                            <p>You rated this movie {watchedUserRating} ⭐</p>
                        }
                        <p><em>{plot}</em></p>
                        <p>Starring {actors}</p>
                        <p>Directed by {director}</p>
                    </section>
                </>
            }
            {/* {selectedId} */}
        </div>
    );
}

export default MovieDetails;