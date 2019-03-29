import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MatchItem from './MatchItem';
import TradeItem from "./TradeItem";

class Matches extends Component {
  state = {
    nameFilter: null,
    gameFilter: [],
    outboundTrade: [],
    inboundTrade: [],
  };

  filterTrade = (matches) => {
    const tradeFiltered = [];
    if (matches.length > 0) {
      const trade = matches.filter(match => match.user.username === this.state.nameFilter);
      for (let i = 0; i < trade.length; i++) {
        for (let j = 0; j < this.state.gameFilter.length; j++) {
          if (trade[i].game.id === this.state.gameFilter[j]) {
            tradeFiltered.push(trade[i]);
          }
        }
      }
    }
    return tradeFiltered;
  };

  generateTradeData = () => {
    this.setState({
      outboundTrade: this.filterTrade(this.props.matchesOut),
      inboundTrade: this.filterTrade(this.props.matchesIn),
    });
  };

  onClickGame = (nameFilter, gameId, event) => {
    event.preventDefault();
    const { gameFilter } = this.state;
    this.setState({
      gameFilter: [...gameFilter, gameId],
      nameFilter,
    }, () => { this.generateTradeData(); });
  };

  mapFilter = direction => {
    const { matchesOut, matchesIn } = this.props;
    const { nameFilter, gameFilter } = this.state;
    let matches;
    (direction === 'out') ? matches = matchesOut : matches = matchesIn;
    return (
      <tbody>
        {matches.length > 0 && !nameFilter
        && matches.map((match) => (this.renderRow(match)))}
        {matches.length > 0 && nameFilter
            && matches.filter(match => match.user.username === nameFilter)
              .filter(match => gameFilter.every((game) => game !== match.game.id))
              .map((match) => (this.renderRow(match)))}
      </tbody>
    );
  }

  clearFilter = (event) => {
    event.preventDefault();
    this.setState({
      nameFilter: undefined,
      gameFilter: [],
      outboundTrade: [],
      inboundTrade: [],

    });
  }

  renderRow = (match) => (
    <tr key={match.id} onClick={(e) => this.onClickGame(match.user.username, match.game.id, e)}>
      <MatchItem key={match.id} match={match} />
    </tr>
  )

  render() {
    const { nameFilter, outboundTrade, inboundTrade } = this.state;
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
          <tbody>
            <tr>
              <td style={noPadding}>
                <table style={tableStyleNested}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Platform</th>
                      <th>Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outboundTrade.map((tradeItem) => (
                      <TradeItem key={tradeItem.id} trade={tradeItem} />
                    ))}
                  </tbody>
                </table>
              </td>
              <td style={noPadding}>
                <table style={tableStyleNested}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Platform</th>
                      <th>Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inboundTrade.map((tradeItem) => (
                      <TradeItem key={tradeItem.id} trade={tradeItem} />
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
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

const noPadding = {
  padding: "0px",
  width: "50%",
  verticalAlign: "top",
};

const tableStyle = {
  marginLeft: "auto",
  marginRight: "auto",
};

const tableStyleNested = {
  width: "100%",
  margin: "0px",
};

const h1Style = {
  align: "center",
  textAlign: "center",
};

const h2Style = {
  align: "center",
  textAlign: "center",
};
