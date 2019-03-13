import React, { Component } from 'react';

export class GameItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.game.title}</p>
        {/* <p>game item</p> */}
      </div>
    );
  }
}

export default GameItem;
