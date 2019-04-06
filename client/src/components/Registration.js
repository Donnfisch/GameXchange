import React, { Component } from 'react';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { FormErrors } from './FormErrors';
import API from '../utils/API';
import './styles/Registration.css';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      address: '',
      username: '',
      password: '',
      formErrors: {
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        password: '',
        password2: '',
      },
      emailValid: false,
      firstnameValid: false,
      lastnameValid: false,
      addressValid: false,
      usernameValid: false,
      passwordValid: false,
      password2Valid: false,
      formValid: false,
      message: '',
    };
  }

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState(
      {
        message: '',
        [name]: value,
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
      password,
    } = this.state;
    event.preventDefault();
    this.createUser(email, firstname, lastname, address, username, password);
  };

  createUser = (email, firstname, lastname, address, username, password) => {
    API.newUser(email, firstname, lastname, address, username, password).then(res => {
      if (!res.created) {
        this.setState({ message: 'USER OR EMAIL ALREADY IN USE' });
      } else {
        window.location.replace('/');
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
    } = this.state;

    const { formErrors, password } = this.state;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : 'Invalid email address';
        break;
      case 'firstname':
        firstnameValid = value.length <= 20 && value.match(/^[a-z0-9]+$/i) !== [];
        formErrors.firstname = firstnameValid
          ? ''
          : 'Must contain only letters';
        break;
      case 'lastname':
        lastnameValid = value.length <= 20 && value.match(/^[a-z0-9]+$/i) !== [];
        formErrors.lastname = lastnameValid ? '' : 'Must contain only letters';
        break;
      case 'address':
        addressValid = value.match(/^[a-z 0-9]+$/i) !== [];
        formErrors.address = addressValid ? '' : 'Must contain only letters';
        break;
      case 'username':
        usernameValid = value.length >= 4
          && value.length <= 16
          && value.match(/^[a-z0-9]+$/i) !== [];
        formErrors.username = usernameValid
          ? ''
          : 'Username must be alphanumeric and between 4 and 16 characters';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        formErrors.password = passwordValid
          ? ''
          : 'Password must be at least 6 characters';
        break;
      case 'password2':
        password2Valid = value === password;
        formErrors.password2 = password2Valid ? '' : 'Passwords must match';
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
        password2Valid,
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
      password2Valid,
    } = this.state;
    this.setState({
      formValid:
        emailValid
        && usernameValid
        && firstnameValid
        && lastnameValid
        && addressValid
        && passwordValid
        && password2Valid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
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
      message,
    } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <div className="regBox">
          <h6 className="email">Email</h6>
          <Input
            className={this.errorClass(formErrors.email)}
            type="email"
            required
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>First Name</h6>
          <Input
            className={this.errorClass(formErrors.firstname)}
            type="text"
            required
            name="firstname"
            placeholder="First Name"
            value={firstname}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>Last Name</h6>
          <Input
            className={this.errorClass(formErrors.lastname)}
            type="text"
            required
            name="lastname"
            placeholder="Last Name"
            value={lastname}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>Address</h6>
          <Input
            className={this.errorClass(formErrors.address)}
            type="text"
            required
            name="address"
            placeholder="Address"
            value={address}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>Username</h6>
          <Input
            type="text"
            required
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>Password</h6>
          <Input
            className={this.errorClass(formErrors.password)}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>Re-Type Password</h6>
          <div className="boxStyle">
            <Input
              className={this.errorClass(formErrors.password)}
              type="password"
              name="password2"
              placeholder="Enter Password Again"
              value={password2}
              onChange={this.handleUserInput}
              fluid
            />
          </div>
        </div>
        <Button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary"
          disabled={!formValid}
        >
          Submit
        </Button>
        <FormErrors formErrors={formErrors} />
        <p>
          {message}
        </p>
      </Container>
    );
  }
}
export default Registration;
