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


  render() {
    return (
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
    );
  }
}


