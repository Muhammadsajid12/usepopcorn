import { Link, Route, Routes } from "react-router-dom";
import Home from "./main/Home";
import About from "./components/About";
import MoreDetail from "./components/MoreDetail";
import Actors from "./components/Actors";
import Director from "./components/Director";
import Actor from "./components/Actor";
import NotFoundPage from "./components/NotFoundPage";
import { useEffect } from "react";
// Compoents

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
        <Route path="/more-detail" Component={MoreDetail}>
          <Route index Component={Actors} />
          {/* This is index route render at parent level */}
          <Route path="actors" Component={Actors} />
          <Route path="director" Component={Director} />
        </Route>
        <Route path="actor/:userId" Component={Actor} />
        <Route path="*" Component={NotFoundPage} />
      </Routes>
    </>
  );
}
