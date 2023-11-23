import { ToastContainer, toast } from "react-toastify";
import StarRating from "../../components/StarRating";
import Loader from "../helper/Loader";
import { ErrorMessage } from "../movielist/TemMovieList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const KEY = "f0a40cc3";

export default function MovieDetail({
  selectedMovieId,
  backHandler,
  addWatchHandler,
  watched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [error, setError] = useState("");
  const [onStarRating, setOnStarRating] = useState();
  const navigate = useNavigate(); // react Route hook..
  // console.log(onStarRating, "onStarRating");
  // Destucture the object...
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Released: released,
    Runtime: runTime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: directors,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetail() {
      setIsLoading(true);
      try {
        const res = await fetch(
          ` http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`
        );

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.log(err.message, "catch Error");
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetail();
  }, [selectedMovieId]);
  // This is useEffect run for set title and unset the title...
  useEffect(() => {
    document.title = `${isLoading ? "loading" : title}`;
    // This is useEffect cleanup fn called when component is unmounte
    return function () {
      document.title = "usePopCorn";
    };
  }, [isLoading, title]);
  // This effect for escape
  useEffect(() => {
    function callBack(event) {
      if (event.code === "Escape") {
        backHandler();
        console.log("Closing");
      }
    }

    document.addEventListener("keydown", callBack);

    return function () {
      document.removeEventListener("keydown", callBack);
    };
  }, [backHandler]);

  // Check This movie is already in movie list
  const alreadyExist = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovieId);

  // get the rating of this movie
  const movieRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;
  // Add Movie Handler
  const notify = () => toast("Movie added Successfully!");
  function handeledAdd() {
    notify();
    const newMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      userRating: onStarRating,
      imdbRating: Number(imdbRating),
      runTime: Number(runTime.split(" ").at(0)),
    };
    addWatchHandler(newMovie);
  }

  return (
    <>
      {error && <ErrorMessage message={error} />}
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={backHandler}>
              &larr;
            </button>
            <img src={poster} alt={`poster of movie${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull;{runTime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDB Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!alreadyExist ? (
                <>
                  <StarRating
                    maxStar={10}
                    size={30}
                    setOnStarRating={setOnStarRating}
                  />

                  {onStarRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => {
                        handeledAdd();
                        backHandler();
                      }}
                    >
                      +Add the Rating
                    </button>
                  )}
                </>
              ) : (
                <p>{` You have already rate this movie with: ${movieRating}🌟 rating`}</p>
              )}
            </div>

            <p>{plot}</p>
            <p> {`Staring: ${actors}`}</p>
            <p> {`Derectors: ${directors}`}</p>
            <button
              onClick={() => navigate("/more-detail")}
              className="btn-add btn-size"
            >
              More Details
            </button>
          </section>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
