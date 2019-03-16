import React, { Component } from 'react';
import logo from './Images/GXlogo.png';

export class logo extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="logo" />
      </div>
    );
  }
}

export default logo;
