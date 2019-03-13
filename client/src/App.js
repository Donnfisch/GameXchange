import React, { Component } from 'react';
import Login from './components/Login';
// import axios from 'axios';

class App extends Component {
  state = {
    jwtVerified: false,
    username: '',
    password: ''
  }

    // Login
  login = (username, password) => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
  }


  render() {
    return (
      <div className="App">
        <Login login={this.login} />
      </div>
    );
  }
}

export default App;