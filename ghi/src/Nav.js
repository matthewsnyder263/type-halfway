import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Nav() {
  // const pageWrapper = document.getElementById("page-wrapper");
  // pageWrapper.getElementsByClassName = ("col-xs-7 col-sm-6 col-lg-12");
  return (
    // <div className="container">
    //   <div className="row">
    <div id="page-wrapper">
      {/* Header */}
      <div id="header-wrapper">
        <header id="header" className="container">
          {/* Logo */}
          <div id="logo">
            <h1>
              <Link to="index.html">Halfway</Link>
            </h1>
            <span>by Halfway Harmony</span>
          </div>

          <nav id="nav">
            <ul>
              <li className="current">
                <Link to="#">Matches</Link>
                <ul>
                  <li>
                    <Link to="#">Potential Matches</Link>
                  </li>
                  <li>
                    <Link to="#">Meet The Team</Link>
                  </li>
                  <li>
                    <Link to="#">Contact us</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link to="/profile">View My Profile</Link>
              </li>
              <li>
                <Link to="/about-us">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
    //   </div>
    // </div>
  );
}
