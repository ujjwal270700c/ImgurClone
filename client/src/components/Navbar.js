import React, { useContext,Fragment } from "react";
import { Link } from "react-router-dom";
import authContext from "./auth/AuthContext";

const Navbar = () => {
  const authcontext = useContext(authContext);
  const {isAuthenticated, logout } = authcontext;
  const Exit=()=>{
     logout();
  }
  const authlink = (
    <Fragment>
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          <b>Home</b>
        </Link>
      </li>
      <li className="nav-item active">
        <Link className="nav-link" to="/addimg">
          <b>ADD</b>
        </Link>
      </li>
      <li className="nav-item active">
        <a onClick={Exit} className="nav-link" href="/">
          <b>LogOut</b>
        </a>
      </li>
    </Fragment>
  );
  const unauthlink = (
    <Fragment>
      { <Link class="navbar-brand" to="/">
        Home
      </Link> }
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <b>ADD</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <b>Register</b>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <b>Log In</b>
        </Link>
      </li>
    </Fragment>
  );
  return (
    <div className="navbar navbar-expand-lg navbar-primary bg-light">
      <Link class="navbar-brand " to="#">
        <h3>Imgur Clone App</h3>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {isAuthenticated ? authlink : unauthlink}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;