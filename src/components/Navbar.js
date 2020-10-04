import React from "react";
import logo from "./../logo.svg";

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top App-logo "
          alt=""
          loading="lazy"
        />
        <div >
         W,A,S,D to move the Box and Delete to Remove the Box.
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
