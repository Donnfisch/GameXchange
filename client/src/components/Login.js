/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import API from '../utils/API';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    API.authenticateUser(this.state.userName, this.state.password)
      .then(res => res.redirect("/mygames"));
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          id="userName"
          value={this.state.userName}
          onChange={this.handleChange}
          required
          // autoFocus
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button
          className="btn btn-lg btn-primary btn-block mb-1"
          type="submit"
          // id="loginSubmit"
        >
        Sign in
        </button>
      </form>
    );
  }
}

export default Login;
