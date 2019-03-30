<<<<<<< HEAD
import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, InputGroup, InputGroupButtonDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroupAddon } from 'reactstrap';
import navLogo from '../img/GXnavlogo.png';
import '../Style/navBar.css';
import LogIn from "./LogIn";
import Search from "./Search";
import NavLinks from "./NavLinks";



const nLogo = [navLogo];


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }


=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

>>>>>>> master
  render() {
    const {
      handleSearch, handleMyGames, handleMatches, history, setUserState,
    } = this.props;
    const { activeItem } = this.state;
    return (
<<<<<<< HEAD
      <div>
        <Navbar color="#b503c5" light expand="sm">
          <NavbarBrand href="/">
            <img src={nLogo} alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavLinks />
              <Search />
              <LogIn />
            </Nav>
          </Collapse>
        </Navbar>
      </div>
=======
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
          <Search handleSearch={handleSearch} />
        </Menu.Item>
        <Menu.Item>
          <NavLinks
            history={history}
            handleMyGames={handleMyGames}
            handleMatches={handleMatches}
          />
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
>>>>>>> master
    );
  }
}

<<<<<<< HEAD

=======
Nav.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleMyGames: PropTypes.func.isRequired,
  handleMatches: PropTypes.func.isRequired,
  setUserState: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
>>>>>>> master
