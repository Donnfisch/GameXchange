import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

function NavTabs({ isLoggedIn }) {
  if (isLoggedIn) {
    return (
      <React.Fragment>
        <Link to="/mygames"> My Games </Link>
        <Link to="/logout"> Log Out </Link>
      </React.Fragment>
    );
  }
  return <Link to="/login"> Log In </Link>;
}


NavTabs.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavTabs;
w