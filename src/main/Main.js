import { useEffect, useState } from "react";
import { TemMovieList } from "./movielist/TemMovieList";
import TempWatchList from "./watchlist/TempWatchList";

export default function Main({ query }) {
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function selectedMovieHandler(id) {
    setSelectedMovieId((selected) => (selected === id ? null : id));
  }

  function backHandler() {
    setSelectedMovieId(null);
  }

  return (
    <main className="main">
      <div className="box">
        <TemMovieList
          query={query}
          selectedMovieHandler={selectedMovieHandler}
          backHandler={backHandler}
        />
      </div>

      <div className="box">
        <TempWatchList
          selectedMovieId={selectedMovieId}
          backHandler={backHandler}
        />
      </div>
    </main>
  );
}
