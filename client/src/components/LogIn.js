/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
const axios = require('axios');

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      password: "",
    };
  }

  handleChange = event => {
    // console.log(this.state);
    this.setState({
      [event.target.id]: event.target.value,
    });
  }


  authenticateUser = (username, password) => {
    axios
      .post(`/api/auth`, {
        username,
        password,
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }


  // authenticateUser = (username, password) => $.ajax({
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     type: "POST",
  //     url: "/api/auth",
  //     data: JSON.stringify(
  //       {
  //         username,
  //         password,
  //       }
  //     ),
  //   })

  handleSubmit = event => {
    event.preventDefault();
    this.authenticateUser(this.state.userName, this.state.password);
  }

  validateForm() {
    return this.state.userName.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <form className="form-signin">
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Username"
          id="userName"
          value={this.state.userName}
          onChange={this.handleChange}
          required
          // autoFocus
        />
        <input
          type="password"
          className="form-control form-control-sm"
          placeholder="Password"
          id="password"
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button
          className="btn btn-primary btn-sm "
          type="submit"
          // id="loginSubmit"
        >
        Sign in
        </button>
      </form>
    );
  }
}

export default LogIn;
