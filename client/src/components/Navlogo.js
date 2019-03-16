import React, { Component } from 'react';
import navLogo from './Images/GXnavlogo.png';

export class navLogo extends Component {
  render() {
    return (
      <div>
        <img src={navLogo} alt="navLogo" />
      </div>
    );
  }
}

export default navLogo;
