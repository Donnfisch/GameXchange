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
    const { nameFilter, gameFilter } = this.state;
    const tradeFiltered = [];
    if (matches.length > 0) {
      const trade = matches.filter(match => match.user.username === nameFilter);
      for (let i = 0; i < trade.length; i++) {
        for (let j = 0; j < gameFilter.length; j++) {
          if (trade[i].game.id === gameFilter[j]) {
            tradeFiltered.push(trade[i]);
          }
        }
      }
    }
    return tradeFiltered;
  };

  generateTradeData = () => {
    const { matchesIn, matchesOut } = this.props;
    this.setState({
      outboundTrade: this.filterTrade(matchesOut),
      inboundTrade: this.filterTrade(matchesIn),
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

  generateRequest = () => {
    const { inboundTrade, outboundTrade } = this.state;
    const { username } = this.props;
    const mailto = outboundTrade[0].user.email;
    const subject = "GameXchange Trade Request from USERID";
    const message = `Dear ${outboundTrade[0].user.username},%0A%0A  This is an autogenerated email from gameXchange. The gameXchange user "${username}" would like to offer the following trade:`;
    let outboundOffer = '%0A%0AGAMES YOU WILL BE SENDING THEM%0A---------------------------------------';
    for (let i = 0; i < outboundTrade.length; i++) {
      outboundOffer += `%0A${outboundTrade[i].game.title}(${outboundTrade[i].game.platform})`;
    }
    let inboundOffer = '%0A%0AGAMES YOU WILL BE RECEIVING%0A---------------------------------------';
    for (let i = 0; i < inboundTrade.length; i++) {
      inboundOffer += `%0A${inboundTrade[i].game.title}(${inboundTrade[i].game.platform})`;
    }
    window.location.href = `mailto:${mailto}?subject=${subject}&body=${message}${outboundOffer}${inboundOffer}`;
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
        <h2 style={h2Style}>Trade Proposal</h2>
        {!nameFilter
        && <h4 style={h4Style}>(Select a game to create trade proposal)</h4>}
        {nameFilter
        && (
          <React.Fragment>
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
            <div style={buttonDivOuter}>
              <div style={buttonDivInner}>
                <button type="button" onClick={this.clearFilter}> Clear Filter </button>
                <button type="button" onClick={this.generateRequest}> Generate Request </button>
              </div>
            </div>
          </React.Fragment>
        )}
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
  username: PropTypes.string,
  matchesOut: PropTypes.array.isRequired,
  matchesIn: PropTypes.array.isRequired,
};

export default Matches;

const buttonDivOuter = {
  padding: "10px",
  textAlign: "center",
};

const buttonDivInner = {
  display: "inline-block",
  // padding: "50px",
};

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

const h4Style = {
  align: "center",
  textAlign: "center",
  marginTop: "0px",
  paddingTop: "0px",
};