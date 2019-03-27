
import React from 'react';
import PropTypes from 'prop-types';
import MatchItem from './MatchItem';

const Matches = props => {
  const { matchesOut, matchesIn } = props;
  if (matchesOut === undefined || matchesIn === undefined) return null;
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
          {matchesOut.map((match) => (
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
          {matchesIn.map((match) => (
            <MatchItem key={match.id} match={match} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

Matches.propTypes = {
  matchesOut: PropTypes.array.isRequired,
  matchesIn: PropTypes.array.isRequired,
};

export default Matches;

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
};

const h1Style = {
  align: "center",
  textAlign: "center",
};

const h2Style = {
  align: "center",
  textAlign: "center",
};
