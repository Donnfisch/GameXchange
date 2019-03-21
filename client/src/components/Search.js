import React, { Component } from 'react';
// const axios = require('axios');

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      platform: "",
      searchTerm: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   const token = document.cookie.split(";")
  //     .filter(
  //       (element) => element.indexOf('token=') === 0
  //     )[0].split("=")[1];
  //   axios
  //     .get(`/api/games/title/${this.state.searchTerm}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  render() {
    const { searchTerm, platform } = this.state;

    return (
      <form
        className="form-search"
        onSubmit={this.props.handleSearch.bind(this, searchTerm)}
      >
        <select
          name="platform"
          value={platform}
          id="platform"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <option value="all">All Platforms</option>
          <option value="PS4">PS4</option>
          <option value="XBox One">XBox One</option>
          <option value="Switch">Switch</option>
        </select>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search"
          id="searchTerm"
          value={searchTerm}
          onChange={this.handleChange}
          required
          // autoFocus
        />
        <button
          className="btn btn-lg btn-primary btn-block mb-1"
          type="submit"
          // id="loginSubmit"
        >
        Search
        </button>
      </form>
    );
  }
}

export default Search;
