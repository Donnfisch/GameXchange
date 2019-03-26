/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class MatchItem extends Component {
  render() {
    // console.log(this.props.game.inventories);
    // let have = false;
    // let want = false;]
    // let trade = false;
    // if (this.props.game.inventories) {
    //   have = this.props.game.inventories[0].have;
    //   want = this.props.game.inventories[0].want;
    //   trade = this.props.game.inventories[0].trade;
    // }
    return (
      <tr>
        <td>
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
        {/* <td>
          {this.props.match.game.inventories[0].user.username}
        </td> */}
      </tr>

    );
  }
}

MatchItem.propTypes = {
  match: PropTypes.array.isRequired,
};

export default MatchItem;
