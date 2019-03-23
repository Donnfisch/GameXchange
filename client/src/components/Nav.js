/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Search from "./Search";
import NavTabs from "./NavTabs";

class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-secondary">
        <a className="navbar-brand" href="/">
          GameXchange
        </a>
        <Search handleSearch={this.props.handleSearch} />
        <NavTabs handleMyGames={this.props.handleMyGames} />
      </nav>
    );
  }
}

export default Nav;
