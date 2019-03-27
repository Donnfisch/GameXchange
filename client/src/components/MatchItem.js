/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MatchItem extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.match.game.id}
          {' '}
          {this.props.match.game.title}
        </td>
        <td>
          {this.props.match.game.platform}
        </td>
        <td>
          {this.props.match.game.region}
        </td>
        <td>
          {this.props.match.game.publisher}
        </td>
        <td>
          {this.props.match.game.version}
        </td>
        <td>
          {this.props.match.user.username}
        </td>
        <td>
          {this.props.match.user.email}
        </td>
      </tr>
    );
  }
}

MatchItem.propTypes = {
  match: PropTypes.object.isRequired,
};

export default MatchItem;
