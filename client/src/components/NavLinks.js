import React, { Component } from 'react';

export class NavLinks extends Component {
  render() {
    return (
      <div>
        <a href="#" onClick={this.props.handleMyGames}>My Games</a>
      </div>
    );
  }
}

export default NavLinks;
