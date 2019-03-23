import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

function NavTabs({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? <Link to="/login">Log In </Link> : <Link to="/logout">Log Out </Link>}
      <Link to="/mygames">My Games</Link>
    </div>
  );
}


NavTabs.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavTabs;
