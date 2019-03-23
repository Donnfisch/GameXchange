/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import PropTypes from "prop-types";
import GameItem from "./GameItem";

class Games extends Component {
  render() {
    return (
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
            {this.props.games.map(game => (
              <GameItem
                changeGameStatus={this.props.changeGameStatus}
                key={game.id}
                game={game}
              />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Games.propTypes = {
  games: PropTypes.object.isRequired
};

export default Games;

const tableStyle = {
  // position: "fixed",
  // bottom: "0",
  // width: "100%",
  // height: "65px",
  // lineHeight: "55px",
  marginLeft: "auto",
  marginRight: "auto"
  // textAlign: "center",
  // borderTop: "8px solid #000000",
  // fontSize: "24px",
};

const h1Style = {
  align: "center",
  textAlign: "center"
};
