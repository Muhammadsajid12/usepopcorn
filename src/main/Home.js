import Main from "./Main";
import NavBar from "./navbar/NavBar";
import NumberBar from "./navbar/NumberBar";
import SearchBar from "./navbar/SearchBar";
import { tempMovieData } from "../data/data";
import { useState } from "react";

function Home() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumberBar movies={tempMovieData.length} />
      </NavBar>
      <Main query={query} />
    </div>
  );
}

export default Home;
