/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export class NavLinks extends Component {
  onClickGames = (event) => {
    event.preventDefault();
    const { handleMyGames, history } = this.props;
    history.push('/games');
    handleMyGames();
  }

  onClickMatches = (event) => {
    event.preventDefault();
    const { handleMyGames, history } = this.props;
    history.push('/games');
    handleMyGames();
  }

  onClickMatches = (event) => {
    event.preventDefault();
    const { handleMyGames, history } = this.props;
    history.push('/games');
    handleMyGames();
  }

  onClickProfile = (event) => {
    event.preventDefault();
    const { handleMyGames, history } = this.props;
    history.push('/profile');
    handleMyGames();
  }

  render() {
    return (
      <React.Fragment>
        <a href="" onClick={this.onClickGames}> My Games </a>
        <a href="" onClick={this.onClickMatches}> Matches </a>
        <a href="" onClick={this.onClickProfile}> Profile </a>
        {/* <Link to="/logout"> Log Out </Link> */}
      </React.Fragment>
    );
  }
}

export default NavLinks;
