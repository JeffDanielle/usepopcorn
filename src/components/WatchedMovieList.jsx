import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched, onDeleteWatched }) => {
    return (
        <ul className="list overflow-hidden">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
            ))}
        </ul>
    );
}

export default WatchedMovieList;