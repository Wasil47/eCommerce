import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <NavLink className="navbar-brand" to="/">
        Ecommerce
      </NavLink>
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
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/products">
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/admin">
              Admin
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;
