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
        // console.log(res.data.user.id);
        document.cookie = `uuid=${res.data.user.id}`;
        document.cookie = `token=${res.data.token}`;
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { userName, password } = this.state;
    this.authenticateUser(userName, password);
  }

  validateForm() {
    const { userName, password } = this.state;
    return userName.length > 0 && password.length > 0;
  }

  render() {
    const { userName, password } = this.state;
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          id="userName"
          value={userName}
          onChange={this.handleChange}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          id="password"
          value={password}
          onChange={this.handleChange}
          required
        />
        <button
          className="btn btn-lg btn-primary btn-block mb-1"
          type="submit"
        >
        Sign in
        </button>
      </form>
    );
  }
}

export default LogIn;
