import React, { Component } from 'react';
import Search from "./Search";
import NavLinks from "./NavLinks";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="/">
          GameXchange
        </a>
        <Search />
        <NavLinks />
      </nav>
    );
  }
}

export default Nav;
