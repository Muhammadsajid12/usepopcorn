// import { tempWatchedData } from "../data/data";
import { useState } from "react";
import Button from "../../components/Button";
import MovieDetail from "../watchlist/MovieDetail";
import "react-toastify/dist/ReactToastify.css";
import { Summary } from "./Summary";
import Movies from "./Movie";

// CommponentStart...
function TempWatchList({ selectedMovieId, backHandler }) {
  const [watched, setWatched] = useState([]);
  const [isOpen2, setIsOpen2] = useState(true);
  // const [selectedMovie, setselectedMovie] = useState();

  function movieWatchedHandler(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  const deleteWatchMovie = (movieID) => {
    // Use the filter method to create a new array without the movie with the specified ID
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== movieID));
  };

  return (
    <>
      <Button isOpen={isOpen2} setIsOpen={setIsOpen2} />

      {isOpen2 &&
        (selectedMovieId ? (
          <MovieDetail
            selectedMovieId={selectedMovieId}
            backHandler={backHandler}
            addWatchHandler={movieWatchedHandler}
            watched={watched}
          />
        ) : (
          <>
            {/* In defualt summary commponent render and when any movie select then detail page opnen */}
            <div className="summary">
              <Summary watched={watched} />
            </div>

            <ul className="list">
              {watched.map((movie, i) => (
                <Movies movie={movie} key={i} onDelete={deleteWatchMovie} />
              ))}
            </ul>
          </>
        ))}
    </>
  );
}

export default TempWatchList;
