import { Link, NavLink, Outlet } from "react-router-dom";
import "./style.css";
function MoreDetail() {
  return (
    <>
      <div>This is Movie detail page</div>
      <nav>
        <Link to="actors" activeClassName="active-tab">
          Actor
        </Link>
        <hr />
        <Link to="director" activeClassName="active-tab">
          Director
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default MoreDetail;
