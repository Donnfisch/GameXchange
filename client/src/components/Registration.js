import axios from 'axios';
import React, { Component } from "react";
import { FormErrors } from "./FormErrors";

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      formErrors: {
        email: "",
        password: "",
        password2: "",
      },
      emailValid: false,
      usernameValid: false,
      passwordValid: false,
      password2Valid: false,
      formValid: false,
    };
  }

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  handleSubmit = event => {
    const { email, username, password } = this.state;
    event.preventDefault();
    this.validateUserData(email, username)
      .then(this.createUser(email, username, password));
  }

  validateUserData = (email, username) => {
    axios
      .post(`/api/user/validate`, {
        email,
        username,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  createUser = (email, username, password) => {
    axios
      .post('api/user/create', {
        email,
        username,
        password,
      })
      .then(res => {
        console.log(res.data.user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  validateField(fieldName, value) {
    const fieldValidationErrors = this.state.formErrors;
    let {
      emailValid,
      usernameValid,
      passwordValid,
      password2Valid,
    } = this.state;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "username":
        usernameValid = value.length >= 6;
        fieldValidationErrors.password = usernameValid ? "" : " is too short";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "password2":
        password2Valid = value === this.state.password;
        fieldValidationErrors.password2 = passwordValid ? "" : " must match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid,
        passwordValid,
        password2Valid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid && this.state.password2Valid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
      <form className="demoForm">
        <h2>Sign up</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.email
          )}`}
        >
          <label htmlFor="username">Username</label>
          <input
            type="text"
            required
            className="form-control"
            name="username"
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
        </div>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
        >
          <label htmlFor="password2">Password</label>
          <input
            type="password"
            className="form-control"
            name="password2"
            placeholder="Enter Password Again"
            value={this.state.password2}
            onChange={this.handleUserInput}
          />
        </div>
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary"
          disabled={!this.state.formValid}
        >
          Sign up
        </button>
      </form>
    );
  }
}
export default Registration;
