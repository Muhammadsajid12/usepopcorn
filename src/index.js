import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from './reportWebVitals';

// This is component use to get state out of the child component..
// function Test() {
//   const [moveRating, setMoveRating] = useState();
//   console.log(moveRating, ">>>>>>");

//   return (
//     <div>
//       <StarRating color="blue " maxStar={10} setMoveRating={setMoveRating} />
//       <p> This movie get {moveRating} number of stars</p>
//     </div>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
