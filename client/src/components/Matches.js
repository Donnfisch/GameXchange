import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MatchItem from './MatchItem';

class Matches extends Component {
  state = {
    gameFilter: [],
  };

  onClickGame = (nameFilter, gameId, event) => {
    event.preventDefault();
    console.log(gameId);
    this.setState({
      gameFilter: [...this.state.gameFilter, gameId],
    });
    this.setState({ nameFilter });
  };

  mapFilter = direction => {
    const { matchesOut, matchesIn } = this.props;
    const { nameFilter } = this.state;
    let matches;
    (direction === 'out') ? matches = matchesOut : matches = matchesIn;
    return (
      <tbody>
        {matches.length > 0 && !nameFilter
        && matches.map((match) => (this.renderRow(match)))}
        {matches.length > 0 && nameFilter
            && matches.filter(match => match.user.username === nameFilter)
            // .filter(match => match.game.id !== this.state.gameFilter[0])

              .filter(match => this.state.gameFilter.every((gameFilter) => gameFilter !== match.game.id))


              .map((match) => (this.renderRow(match)))}
      </tbody>
    );
  }

  clearFilter = (event) => {
    event.preventDefault();
    this.setState({ nameFilter: undefined });
  }

  renderRow = (match) => (
    <tr key={match.id} onClick={(e) => this.onClickGame(match.user.username, match.game.id, e)}>
      <MatchItem key={match.id} match={match} />
    </tr>
  )

  render() {
    const { nameFilter } = this.state;
    return (
      <div>
        <h1 style={h1Style}>Match Component</h1>
        {nameFilter
        && <button type="button" onClick={this.clearFilter}> Clear Filter </button>
        }
        <h2 style={h2Style}>Trade Proposal</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th>Games you are trading</th>
              <th>Game you are receiving</th>
            </tr>
          </thead>
        </table>
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
          {this.mapFilter('out')}
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
          {this.mapFilter('in')}
        </table>
      </div>
    );
  }
}

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
