/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Trade extends Component {
  render() {
    return (
      null
    );
  }
}

Trade.propTypes = {
  matchesOut: PropTypes.array.isRequired,
  matchesIn: PropTypes.array.isRequired,
};

export default Trade;
