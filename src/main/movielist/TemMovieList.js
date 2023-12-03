import { useState } from "react";
// import { tempMovieData } from "../data/data";
import Button from "../../components/Button";
import Loader from "../helper/Loader";
import { useMovie } from "../../customHooks/useMovie";

const loaderStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh", // This ensures the loader covers the entire viewport height
};

function TemMovieList({ query, selectedMovieHandler, backHandler }) {
  const [isOpen1, setIsOpen1] = useState(true);
  // Custom Hook....
  const { error, isLoading, movies } = useMovie(query);

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
