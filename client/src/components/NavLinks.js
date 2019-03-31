import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NavLinks extends Component {
  onClickGames = (event) => {
    event.preventDefault();
    const { handleMyGames, history } = this.props;
    history.push('/games');
    handleMyGames();
  }

  onClickMatches = (event) => {
    event.preventDefault();
    const { handleMatches, history } = this.props;
    history.push('/matches');
    handleMatches('out');
    handleMatches('in');
  }

  onClickProfile = (event) => {
    event.preventDefault();
    const { handleMyGames, history } = this.props;
    history.push('/profile');
    handleMyGames();
  }

  onClickRegister = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/register');
  }


  render() {
    const { token } = this.props;
    return (
      <React.Fragment>
        <button type="button" className="link-button" onClick={this.onClickGames}> My Games </button>
        <button type="button" className="link-button" onClick={this.onClickMatches}> Matches </button>
        <button type="button" className="link-button" onClick={this.onClickProfile}> Profile </button>
        {!token && <button type="button" className="link-button" onClick={this.onClickRegister}> Register </button>}
        {/* <Link to="/logout"> Log Out </Link> */}
      </React.Fragment>
    );
  }
}

NavLinks.propTypes = {
  handleMyGames: PropTypes.func.isRequired,
  handleMatches: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default NavLinks;
