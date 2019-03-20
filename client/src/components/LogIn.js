/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

export class LogIn extends Component {
  render() {
    return (
      <form className="form-signin">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          id="username"
          required
          autoFocus
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          id="password"
          required
        />
        <button
          className="btn btn-lg btn-primary btn-block mb-1"
          type="submit"
          id="loginSubmit"
        >
        Sign in
        </button>
      </form>
    );
  }
}

export default LogIn;
