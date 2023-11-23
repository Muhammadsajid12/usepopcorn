import { useEffect, useState } from "react";
// import { tempMovieData } from "../data/data";
import Button from "../../components/Button";
import { Bars } from "react-loader-spinner";
import Loader from "../helper/Loader";
const KEY = "f0a40cc3";
const temQuery = "interstellar";
const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh", // This ensures the loader covers the entire viewport height
};

function TemMovieList({ query, selectedMovieHandler, backHandler }) {
  const [movies, setMovies] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          ` http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        // If error in network check in res.ok Property
        if (!res.ok) throw new Error("Something went wrong");
        const data = await res.json();
        // If APIKey is not valid and something other then response is False..
        if (data.Response === "False") throw new Error("No Movie  found😟");

        setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    // This condition check query have length more than 3 to search
    if (query.length <= 3) {
      setMovies([]);
      setError("");
      return;
    }
    // Close detail page when new query entered..
    backHandler();
    fetchData();
    // useEffect CleanUp fn
    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      {/* Here we pass the state to the Button component */}
      <Button isOpen={isOpen1} setIsOpen={setIsOpen1} />
      {error && <ErrorMessage message={error} />}
      {isLoading && <Loader />}
      {isOpen1 && (
        <ul className="list  list-movies">
          {movies?.map((movie, i) => (
            <Movies
              movie={movie}
              key={i}
              selectedMovieHandler={selectedMovieHandler}
            />
          ))}
        </ul>
      )}
    </>
  );
}

function Loading() {
  return (
    <div style={loaderStyle}>
      <h1>Loading...</h1>
    </div>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span> <span>{message}</span>
    </p>
  );
}

function Movies({ movie, selectedMovieHandler }) {
  return (
    <li key={movie.imdbID} onClick={() => selectedMovieHandler(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export { TemMovieList, Loading, ErrorMessage };
