/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import NavTabs from "./NavTabs";
import Search from "./Search";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-secondary">
        <a className="navbar-brand" href="/">
          GameXchange
        </a>
        <Search handleSearch={this.props.handleSearch} />
        <NavTabs
          handleMyGames={this.props.handleMyGames}
          isLoggedIn={this.props.isLoggedIn}
        />
      </nav>
    );
  }
}

export default Nav;
