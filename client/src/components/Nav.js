/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import Search from "./Search";
import NavLinks from "./NavLinks";
import LogIn from "./LogIn";
import navLogo from "./styles/images/GXnavlogo.png";
import Welcome from "./Welcome";
import "./styles/Navbar.css";

export default class Nav extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
          <Image
            src={navLogo}
            size="small"
            as="a"
            href={Welcome}
            target="_blank"
          />
        </Menu.Item>
        <Menu.Item>
          <Search handleSearch={this.props.handleSearch} />
        </Menu.Item>
        <Menu.Item>
          <NavLinks history={this.props.history} handleMyGames={this.props.handleMyGames} handleMatches={this.props.handleMatches} />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <LogIn />
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
