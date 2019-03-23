import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
  return (
    <div>
      <Link to="/login">Login </Link>
      <Link to="/mygames">My Games</Link>
    </div>
  );
}

export default NavTabs;
