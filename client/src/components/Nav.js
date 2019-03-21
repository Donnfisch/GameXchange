/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Search from "./Search";
import NavLinks from "./NavLinks";
import LogIn from "./LogIn";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-secondary">
        <a className="navbar-brand" href="/">
          GameXchange
        </a>
        <Search handleSearch={this.props.handleSearch} />
        <LogIn />
        <NavLinks handleMyGames={this.props.handleMyGames} />
      </nav>
    );
  }
}

export default Nav;
