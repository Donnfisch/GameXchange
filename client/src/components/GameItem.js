/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class GameItem extends Component {
  render() {
    // console.log(this.props.game.inventories);
    let have = false;
    let want = false;
    let trade = false;
    if (this.props.game.inventories) {
      have = this.props.game.inventories[0].have;
      want = this.props.game.inventories[0].want;
      trade = this.props.game.inventories[0].trade;
    }
    return (
      <tr>
        <td>
          <input type="checkbox" className="haveCheckBox" value={this.props.game.id} checked={have} onChange={this.props.changeGameStatus.bind(this, have, want, trade, this.props.game.id)} />
        </td>
        <td>
          <input type="checkbox" className="wantCheckBox" value={this.props.game.id} checked={want} onChange={this.props.changeGameStatus.bind(this, have, want, trade, this.props.game.id)} />
        </td>
        <td>
          <input type="checkbox" className="tradeCheckBox" value={this.props.game.id} checked={trade} onChange={this.props.changeGameStatus.bind(this, have, want, trade, this.props.game.id)} />
        </td>
        <td>
          {this.props.game.title}
        </td>
        <td>
          {this.props.game.platform}
        </td>
        <td>
          {this.props.game.region}
        </td>
        <td>
          {this.props.game.publisher}
        </td>
        <td>
          {this.props.game.version}
        </td>
      </tr>
    );
  }
}

GameItem.propTypes = {
  game: PropTypes.array.isRequired,
};

export default GameItem;
