import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import Search from "./Search";
import NavLinks from "./NavLinks";
import LogIn from "./LogIn";
import navLogo from "./styles/images/GXnavlogo.png";
import "./styles/Navbar.css";

export default class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {
      handleSearch, handleMyGames, handleMatches, history, setUserState,
    } = this.props;
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item>
          <Image
            src={navLogo}
            size="small"
            as="a"
            href="/"
          />
        </Menu.Item>
        <Menu.Item>
          <Search className="navBarComp" handleSearch={this.props.handleSearch} />
        </Menu.Item>
        <Menu.Item>
          <NavLinks history={this.props.history} handleMyGames={this.props.handleMyGames} />
        </Menu.Item>
        <Menu.Menu position="right">

          <Menu.Item>
            <LogIn setUserState={setUserState} />
          </Menu.Item>
          <Menu.Item>

          </Menu.Item>
          <Menu.Item
            name="logout"
            active={activeItem === 'logout'}
            onClick={this.handleItemClick}
          />
        </Menu.Menu>
      </Menu>
    );
  }
}

Nav.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleMyGames: PropTypes.func.isRequired,
  handleMatches: PropTypes.func.isRequired,
  setUserState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
