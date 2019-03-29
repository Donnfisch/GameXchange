/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TradeItem from './TradeItem';

class Trade extends Component {
  // state = {
  //   outBound: [],
  //   inBound: [],
  // };

  // generateTableData = () => {
  //   const outBoundFiltered = [];
  //   if (this.props.matchesOut.length > 0) {
  //     const outBound = this.props.matchesOut.filter(match => match.user.username === this.props.nameFilter);
  //     for (let i = 0; i < outBound.length; i++) {
  //       for (let j = 0; j < this.props.gameFilter.length; j++) {
  //         if (outBound[i].game.id === this.props.gameFilter[j]) {
  //           // console.log(`MATCH: ${outBound[i].game.id} ${outBound[i].game.title} ${this.props.gameFilter[j]}`);
  //           outBoundFiltered.push(outBound[i]);
  //         }
  //         console.log(`gameFilter= ${this.props.gameFilter}`);
  //       }
  //     }

  //     // .map((match) => (this.renderRow(match)))
  //   //   );
  //   }
  //   console.log(`outBoundFiltered= ${JSON.stringify(outBoundFiltered)}`);
  //   this.setState({ outBound: outBoundFiltered });
  //   // { this.props.matchesOut.map((match) => (
  //   //   <TradeItem key={match.id} match={match} />
  //   // )); }
  // };

  render() {
    return (
      <tbody>
        {/* {this.generateTableData} */}
      </tbody>
    );
  }
}

Trade.propTypes = {
  matchesOut: PropTypes.array.isRequired,
  matchesIn: PropTypes.array.isRequired,
};

export default Trade;
