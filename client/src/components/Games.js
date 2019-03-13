import React, { Component } from 'react';
import GameItem from './GameItem';

class Games extends Component {
  render() {
    return (
      <div>
        <h1>Games Component</h1>
        {this.props.games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    );
  }
}

export default Games;
