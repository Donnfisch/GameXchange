import React, { Component } from 'react';

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
    // console.log(this.state);
  }

  render() {
    return (
      <form
        className="form-search"
        value={this.state.platform}
        id="platform"
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
      >
        <select name="platform">
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
          value={this.state.searchTerm}
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
