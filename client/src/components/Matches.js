/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import MatchItem from './MatchItem';

class Matches extends Component {
  render() {
    return (
      <div>
        <h1 style={h1Style}>Match Component</h1>
        <h2 style={h2Style}>Users Searching for Your Games</h2>

        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Platform</th>
              <th>Region</th>
              <th>Publisher</th>
              <th>Version</th>
              <th>Username</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.props.matchesOut.map((match) => (
              <MatchItem key={match.id} match={match} />
            ))}
          </tbody>
        </table>
        <h2 style={h2Style}>Users Who Have The Games You Want</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Platform</th>
              <th>Region</th>
              <th>Publisher</th>
              <th>Version</th>
              <th>Username</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {this.props.matchesIn.map((match) => (
              <MatchItem key={match.id} match={match} />
            ))}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Matches;

const tableStyle = {
  // position: "fixed",
  // bottom: "0",
  // width: "100%",
  // height: "65px",
  // lineHeight: "55px",
  marginLeft: "auto",
  marginRight: "auto",
  // textAlign: "center",
  // borderTop: "8px solid #000000",
  // fontSize: "24px",
};

const h1Style = {
  align: "center",
  textAlign: "center",
};

const h2Style = {
  align: "center",
  textAlign: "center",
};
