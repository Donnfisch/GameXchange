import React, { Component } from 'react';
import PropTypes from 'prop-types';
const axios = require('axios');

export class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  authenticateUser = (username, password) => {
    const { setUserState } = this.props;
    axios
      .post(`/api/auth`, {
        username,
        password,
      })
      .then(res => {
        document.cookie = `uuid=${res.data.user.id}`;
        document.cookie = `token=${res.data.token}`;
        setUserState(res.data.user.username, res.data.token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.authenticateUser(username, password);
    this.setState({ username: '', password: '' });
  }

  validateForm() {
    const { username, password } = this.state;
    return username.length > 0 && password.length > 0;
  }

  render() {
    const { username, password } = this.state;
    return (
      <form className="form-signin" onSubmit={this.handleSubmit}>
        <input
          type="text"
<<<<<<< HEAD
          className="form-control form-control-sm"
          placeholder="Username"
          id="userName"
          value={this.state.userName}
=======
          className="form-control mb-2"
          placeholder="username"
          id="username"
          value={username}
>>>>>>> master
          onChange={this.handleChange}
          required
        />
        <input
          type="password"
<<<<<<< HEAD
          className="form-control form-control-sm"
          placeholder="Password"
=======
          className="form-control mb-2"
          placeholder="password"
>>>>>>> master
          id="password"
          value={password}
          onChange={this.handleChange}
          required
        />
        <button
          className="btn btn-primary btn-sm "
          type="submit"
        >
        Sign in
        </button>
      </form>
    );
  }
}

export default LogIn;

LogIn.propTypes = {
  setUserState: PropTypes.func.isRequired,
};
