import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Container, Header } from 'semantic-ui-react';
import { FormErrors } from './FormErrors';
import API from '../utils/API';
import './styles/Registration.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstname: '',
      lastname: '',
      address: '',
      oldPassword: '',
      password: '',
      password2: '',
      formErrors: {
        email: '',
        firstname: '',
        lastname: '',
        address: '',
        oldPassword: '',
        password: '',
        password2: '',
      },
      emailValid: true,
      firstnameValid: true,
      lastnameValid: true,
      addressValid: true,
      oldPasswordValid: true,
      passwordValid: true,
      changedPasswordValid: true,
      password2Valid: true,
      formValid: false,
      message: '',
    };
  }

  componentDidMount() {
    const { user } = this.props;
    const {
      email, firstname, lastname, address,
    } = user;
    this.setState({
      email, firstname, lastname, address,
    });
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
    event.preventDefault();
    const { token } = this.props;
    const {
      email,
      firstname,
      lastname,
      address,
      password,
      oldPassword,
    } = this.state;
    API.updateUser(token, email, firstname, lastname, address, password, oldPassword)
      .then(res => {
        this.setState({
          message: res.message, oldPassword: '', password: '', password2: '',
        });
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
      oldPasswordValid,
      passwordValid,
      changedPasswordValid,
      password2Valid,
    } = this.state;

    const {
      formErrors, password, password2, oldPassword,
    } = this.state;

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
      case 'oldPassword':
      case 'password':
      case 'password2':
        if (oldPassword.length === 0 && password.length === 0 && password2.length === 0) {
          changedPasswordValid = true;
          oldPasswordValid = true;
          passwordValid = true;
          password2Valid = true;
          formErrors.password = '';
        } else {
          changedPasswordValid = oldPassword !== password;
          oldPasswordValid = oldPassword.length >= 6;
          passwordValid = password.length >= 6;
          password2Valid = password2 === password;
          formErrors.password = passwordValid
            ? (formErrors.password = password2Valid
              ? (formErrors.password = oldPasswordValid
                ? (formErrors.password = changedPasswordValid
                  ? ''
                  : 'New password must be different')
                : 'Original password required to make changes')
              : 'Passwords must match')
            : 'Password must be at least 6 characters';
        }
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
        oldPasswordValid,
        passwordValid,
        changedPasswordValid,
        password2Valid,
      },
      this.validateForm
    );
  }

  validateForm() {
    const {
      emailValid,
      firstnameValid,
      lastnameValid,
      addressValid,
      passwordValid,
      changedPasswordValid,
      password2Valid,
      oldPasswordValid,
    } = this.state;
    this.setState({
      formValid:
        emailValid
        && firstnameValid
        && lastnameValid
        && addressValid
        && passwordValid
        && changedPasswordValid
        && oldPasswordValid
        && password2Valid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  render() {
    const { user } = this.props;
    const { username } = user;
    const {
      formErrors,
      email,
      firstname,
      lastname,
      address,
      oldPassword,
      password,
      password2,
      formValid,
      message,
    } = this.state;

    return (
      <Container text>
        <Header as="h2">
Profile:
          {' '}
          {username}
        </Header>
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
          <h2>Change Password</h2>
          <h6>Password</h6>
          <Input
            className={this.errorClass(formErrors.password)}
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={oldPassword}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>New Password</h6>
          <Input
            className={this.errorClass(formErrors.password)}
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleUserInput}
            fluid
          />
          <h6>Re-Type New Password</h6>
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
export default Profile;

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
};
