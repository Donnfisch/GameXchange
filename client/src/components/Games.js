import React from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';
import './styles/Games.css';

const Games = ({ games, changeGameStatus }) => (
  <div>
    <h1 style={h1Style}>Games Component</h1>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th>Have</th>
          <th>Want</th>
          <th>Trade</th>
          <th>Title</th>
          <th>Platform</th>
          <th>Region</th>
          <th>Publisher</th>
          <th>Version</th>
        </tr>
      </thead>
      <tbody>
        {games.map((game) => (
          <GameItem changeGameStatus={changeGameStatus} key={game.id} game={game} />
        ))}
      </tbody>
    </table>
  </div>
);

Games.propTypes = {
  games: PropTypes.array.isRequired,
  changeGameStatus: PropTypes.func.isRequired,
};

export default Games;

const tableStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
};

const h1Style = {
  align: 'center',
  textAlign: 'center',
};
