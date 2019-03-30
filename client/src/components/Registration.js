import axios from "axios";
import React, { Component } from "react";
import { FormErrors } from "./FormErrors";
import { Redirect } from 'react-router-dom'

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstname: "",
      lastname: "",
      address: "",
      username: "",
      password: "",
      formErrors: {
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        password: "",
        password2: ""
      },
      emailValid: false,
      firstnameValid: false,
      lastnameValid: false,
      addressValid: false,
      usernameValid: false,
      passwordValid: false,
      password2Valid: false,
      formValid: false,
      message: ""
    };
  }

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState(
      {
        message: "",
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  handleSubmit = event => {
    const {
      email,
      firstname,
      lastname,
      address,
      username,
      password
    } = this.state;
    event.preventDefault();
    // this.validateUserData(email, username)
    this.createUser(email, firstname, lastname, address, username, password);
  };

  createUser = (email, firstname, lastname, address, username, password) => {
    axios
      .post("/api/auth/user/create", {
        email,
        firstname,
        lastname,
        address,
        username,
        password
      })
      .then(res => {
        console.log(res.data.user);
        if (!res.data.created) {
          this.setState({
            message: "USER OR EMAIL ALREADY IN USE"
          });
        } else {
          window.location.replace("/profile")
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  validateField(fieldName, value) {
    let {
      emailValid,
      firstnameValid,
      lastnameValid,
      addressValid,
      usernameValid,
      passwordValid,
      password2Valid,
      formErrors
    } = this.state;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? "" : "Invalid email address";
        break;
      case "firstname":
        firstnameValid =
          value.length <= 20 && value.match(/^[a-z0-9]+$/i) !== [];
        formErrors.firstname = firstnameValid
          ? ""
          : "Must contain only letters";
        break;
      case "lastname":
        lastnameValid =
          value.length <= 20 && value.match(/^[a-z0-9]+$/i) !== [];
        formErrors.lastname = lastnameValid ? "" : "Must contain only letters";
        break;
      case "address":
        addressValid = value.match(/^[a-z 0-9]+$/i) !== [];
        formErrors.address = addressValid ? "" : "Must contain only letters";
        break;
      case "username":
        usernameValid =
          value.length >= 4 &&
          value.length <= 16 &&
          value.match(/^[a-z0-9]+$/i) !== [];
        formErrors.username = usernameValid
          ? ""
          : "Username must be alphanumeric and between 4 and 16 characters";
        break;
      case "password":
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid
          ? ""
          : "Password must be at least 6 characters";
        break;
      case "password2":
        password2Valid = value === this.state.password;
        formErrors.password2 = password2Valid ? "" : "Passwords must match";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors,
        emailValid,
        firstnameValid,
        lastnameValid,
        addressValid,
        usernameValid,
        passwordValid,
        password2Valid
      },
      this.validateForm
    );
  }

  validateForm() {
    const {
      emailValid,
      usernameValid,
      firstnameValid,
      lastnameValid,
      addressValid,
      passwordValid,
      password2Valid
    } = this.state;
    this.setState({
      formValid:
        emailValid &&
        usernameValid &&
        firstnameValid &&
        lastnameValid &&
        addressValid &&
        passwordValid &&
        password2Valid
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    const {
      formErrors,
      email,
      firstname,
      lastname,
      address,
      username,
      password,
      password2,
      formValid,
      message
    } = this.state;

    return (
      <form className="demoForm">
        <h2> Sign up </h2>{" "}
        <div className={`form-group ${this.errorClass(formErrors.email)}`}>
          <label htmlFor="email"> Email address </label>{" "}
          <input
            type="email"
            required
            className="form-control"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className={`form-group ${this.errorClass(formErrors.email)}`}>
          <label htmlFor="firstname"> First Name </label>{" "}
          <input
            type="text"
            required
            className="form-control"
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className={`form-group ${this.errorClass(formErrors.firstname)}`}>
          <label htmlFor="lastname"> Last Name </label>{" "}
          <input
            type="text"
            required
            className="form-control"
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className={`form-group ${this.errorClass(formErrors.lastname)}`}>
          <label htmlFor="address"> Street Address </label>{" "}
          <input
            type="text"
            required
            className="form-control"
            name="address"
            placeholder="Address"
            value={address}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className={`form-group ${this.errorClass(formErrors.address)}`}>
          <label htmlFor="username"> Username </label>{" "}
          <input
            type="text"
            required
            className="form-control"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className={`form-group ${this.errorClass(formErrors.password)}`}>
          <label htmlFor="password"> Password </label>{" "}
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className={`form-group ${this.errorClass(formErrors.password)}`}>
          <label htmlFor="password2"> Password </label>{" "}
          <input
            type="password"
            className="form-control"
            name="password2"
            placeholder="Enter Password Again"
            value={password2}
            onChange={this.handleUserInput}
          />{" "}
        </div>{" "}
        <div className="panel panel-default">
          <FormErrors formErrors={formErrors} /> <p> {message} </p>{" "}
        </div>{" "}
        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary"
          disabled={!formValid}
        >
          Sign up{" "}
        </button>{" "}
      </form>
    );
  }
}
export default Registration;
