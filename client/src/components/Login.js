import React, { Component } from 'react';
import PropTypes from 'react';

export class Login extends Component {
	state = {
		username: '',
		password: ''
	}

	onChange = (event) => this.setState({ [event.target.name]: event.target.value });

	onSubmit = (event) => {
		event.preventDefault();
		this.props.login(this.state.username, this.state.password);
	}

	render() {
		return (
			<form onSubmit={this.onSubmit} stle={{ display: 'flex' }}>
				<input 
					style={{ flex: '10', padding: '5px' }}
					type="text"
					name="username"
					placeholder="Enter username"
					value={this.state.username}
					onChange={this.onChange}
				/>
				<input 
					style={{ flex: '10', padding: '5px' }}
					type="password"
					name="password"
					placeholder="Enter password"
					value={this.state.password}
					onChange={this.onChange}
				/>
				<input
					type="submit"
					value="Submit"
					className="btn"
					style={{ flex: '1' }}
				/>
			</form>
		)
	}
}

// // PropTypes
// Login.propTypes = {
// 	login: PropTypes.func.isRequired
// }

export default Login
