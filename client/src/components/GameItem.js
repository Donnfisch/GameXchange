import React, { Component } from 'react';

export class GameItem extends Component {
  render() {
    return (

      <tr>
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

    // <p>{this.props.game.title}</p>
    // {/* <p>game item</p> */}

    );
  }
}

export default GameItem;
