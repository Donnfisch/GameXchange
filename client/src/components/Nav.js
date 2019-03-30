import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Image } from "semantic-ui-react";
import Search from "./Search";
import NavLinks from "./NavLinks";
import LogIn from "./LogIn";
import navLogo from "./styles/images/GXnavlogo.png";
import Welcome from "./Welcome";
import "./styles/Navbar.css";

export default class Nav extends Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = (e, { name }) =>
    this.setState({
      activeItem: name
    });

  render() {
    const {
      handleSearch,
      handleMyGames,
      handleMatches,
      history,
      setUserState,
      token
    } = this.props;
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <Image
            src={navLogo}
            size="small"
            as="a"
            href={Welcome}
            target="_blank"
          />
        </Menu.Item>{" "}
        <Menu.Item>
          <Search handleSearch={handleSearch} />{" "}
        </Menu.Item>{" "}
        <Menu.Item>
          <NavLinks
            history={history}
            token={token}
            handleMyGames={handleMyGames}
            handleMatches={handleMatches}
          />{" "}
        </Menu.Item>{" "}
        <Menu.Menu position="right">
          <Menu.Item>
            <LogIn setUserState={setUserState} token={token} />{" "}
          </Menu.Item>{" "}
          <Menu.Item />{" "}
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          />{" "}
        </Menu.Menu>{" "}
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
  token: PropTypes.string
};
