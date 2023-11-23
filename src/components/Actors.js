import { Link, useSearchParams } from "react-router-dom";

function Actors() {
  const [searchParam, setSearchParam] = useSearchParams();
  const showActiveUser = searchParam.get("filter") === "active";
  console.log(process.env.REACT_APP_TITLE, ">>>>>>>>>>");
  return (
    <>
      <div>This is Actors Page</div>
      <Link to="/actor/1">
        <div>Actor 1</div>
      </Link>
      <Link to="/actor/2">
        <div>Actor 2</div>
      </Link>
      <Link to="/actor/3">
        <div>Actor 3</div>
      </Link>
      <h1> {process.env.REACT_APP_TITLE}</h1>

      <div>
        <button onClick={() => setSearchParam({ filter: "active" })}>
          Set Active
        </button>
        <button onClick={() => setSearchParam({})}>Reset Filter</button>
      </div>
      {showActiveUser ? <h2>Active Users</h2> : <h2>All users</h2>}
    </>
  );
}

export default Actors;
