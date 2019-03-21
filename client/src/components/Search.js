import React, { Component } from 'react';


class Search extends Component {
  render() {
    return (
      <div>
        <form>
          <label>
            Game Search
            <input type="text" name="name" />
          </label>
        </form>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button className="dropdown-item" type="button">XBox One</button>
            <button className="dropdown-item" type="button">PlayStation 4</button>
            <button className="dropdown-item" type="button">Nintendo Switch</button>
          </div>
        </div>
          <input type="submit" value="Submit" />
      </div>
    );
  }
}

export default Search;
