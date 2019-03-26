/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import LogIn from "./LogIn";
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
        <LogIn />
        <NavTabs history={this.props.history} handleMyGames={this.props.handleMyGames} />
      </nav>
    );
  }
}

export default Nav;
