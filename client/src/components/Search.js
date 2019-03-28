import React, { Component } from 'react';
import PropTypes from 'prop-types';
// const axios = require('axios');
import { Route } from 'react-router-dom';

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

  render() {
    const { searchTerm, platform } = this.state;
    const { handleSearch } = this.props;

    return (
      <Route
        render={({ history }) => (
          <form
            className="form-search"
            onSubmit={handleSearch.bind(this, searchTerm)}
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
              onClick={() => history.push('/games')}
              // id="loginSubmit"
            >
            Search
            </button>
          </form>
        )}
      />
    );
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default Search;
