import React, { Component } from 'react';
import PropTypes from 'prop-types';
// const axios = require('axios');

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

  handleSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const { authenticateUser } = this.props;
    authenticateUser(username, password);
    this.setState({ username: '', password: '' });
  }

  validateForm() {
    const { username, password } = this.state;
    return username.length > 0 && password.length > 0;
  }

  logOut() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "uuid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = '/';
  }

  render() {
    const { username, password } = this.state;
    const { token } = this.props;
    if (!token && window.location.pathname !== '/') window.location.href = '/';
    return (
      <React.Fragment>
        {!token
              && (
                <form className="form-signin" onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="username"
                    id="username"
                    value={username}
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="password"
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
              )
        }
        {token && <button type="button" className="link-button" onClick={this.logOut}> Log Out </button>}
      </React.Fragment>
    );
  }
}

export default LogIn;

LogIn.propTypes = {
  token: PropTypes.string,
  authenticateUser: PropTypes.func.isRequired,
};
