import { useState } from "react";
import "./custom.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMovieList from "./components/WatchedMovieList";
import { useEffect } from "react";
import SelectedMovie from "./components/MovieDetails";
import MovieDetails from "./components/MovieDetails";
import useMovies from "./customHooks/useMovies";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "c5da4c73";



export default function App() {
  const [query, setQuery] = useState("");
  // const [movies, setMovies] = useState([]);

  const { movies, isLoading, error } = useMovies(query)
  // const [watched, setWatched] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue)
  });


  const handleSelectMovie = (id) => {
    setSelectedId(selectedId => id === selectedId ? null : id);
    setTitle(movies.find(movie => movie.imdbID === id).Title);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  // useEffect(() => {
  //   const controller = new AbortController();

  //   const fetchMovies = async () => {
  //     try {
  //       setIsLoading(true);
  //       setError("");
  //       const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

  //       if (!res.ok)
  //         throw new Error("Something went wrong with fetching movies")


  //       const data = await res.json();
  //       if (data.Response === "False") {
  //         throw new Error("Movie Not Found")
  //       }
  //       setMovies(data.Search);
  //     }
  //     catch (error) {
  //       setError(error.message);

  //       if (error.name !== "AbortError") {
  //         console.log(error.message);
  //         setError(error.message)
  //       }
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   if (!query.length) {
  //     setMovies([]);
  //     setError("");
  //     return;
  //   }
  //   handleCloseMovie();
  //   fetchMovies();
  //   return function () {
  //     controller.abort();
  //   }
  // }, [query])



  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);


  const Loader = () => {
    return <p className="loader">Loading...</p>
  }

  const ErrorMessage = ({ message }) => {
    return (
      <p className="error">
        <span>⛔</span> {message}
      </p>
    )
  }

  const handleAddWatched = (movie) => {
    setWatched([...watched, movie]);
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));
  }

  const handleDeleteWatched = (id) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify((watched)));
  }, [watched])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </ Navbar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </ Box>
        <Box>
          <>
            {selectedId ?
              <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatch={handleAddWatched} watched={watched} /> :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
            }
          </>
        </Box>
      </Main>
    </>
  );
}
