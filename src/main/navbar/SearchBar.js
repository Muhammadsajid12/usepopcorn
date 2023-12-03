import { useEffect, useRef } from "react";
import { useKey } from "../../customHooks/useKey";

function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);
  // This useEffect implelment feature initially focus on search and when enter also focus on searchbar
  // This is custom Hook action little bit different from to Escape...
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search for movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

export default SearchBar;
