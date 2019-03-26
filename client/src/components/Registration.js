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
        username: "",
        password: "",
        password2: "",
      },
      emailValid: false,
      usernameValid: false,
      passwordValid: false,
      password2Valid: false,
      formValid: false,
      serverResponse: "",
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
    let firstname = "John";
    let lastname = "Doe" 
    let address = "poop";
    console.log("FFFFFFFFFFFFFF")
    event.preventDefault();
    console.log("UUUUUUU")
    // this.validateUserData(email, username)
    this.createUser(email, username, password, firstname, lastname, address);
    console.log("KKKKKKKKKKKK")
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

  createUser = (email, username, password, firstname, lastname, address) => {
    axios
      .post(`/api/auth/user/create`, {
        email,
        username,
        password,
        firstname,
        lastname,
        address,
      })
      .then(res => {
        this.setState({serverResponse: res.data});
        console.log(res.data);
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("YO WE GOT RASPONZE")
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("YO HERE BE REQUEZT")
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("NOW YU RELLY FKDUP")
          console.log('Error', error.message);
        }
        console.log("GODAM NUTHIN")
        console.log(error.config);
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
        usernameValid = value.length >= 2;
        fieldValidationErrors.username = usernameValid ? "" : " is too short";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "password2":
        password2Valid = value === this.state.password;
        fieldValidationErrors.password2 = password2Valid ? "" : " must match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid,
        usernameValid,
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
      <React.Fragment>
      <form className="demoForm">
        <h2>Sign up</h2>
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
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
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
      </React.Fragment>
    );
  }
}
export default Registration;
