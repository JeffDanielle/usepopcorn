import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched }) => {
    return (
        <ul className="list overflow-hidden">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    );
}

export default WatchedMovieList;