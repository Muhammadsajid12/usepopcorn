import { useEffect, useState } from "react";
const KEY = "f0a40cc3";

export function useMovie(query) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);

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
    // backHandler();
    fetchData();
    // useEffect CleanUp fn
    return function () {
      controller.abort();
    };
  }, [query]);

  return { error, movies, isLoading };
}
