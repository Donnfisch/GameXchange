import React from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, InputGroup, InputGroupButtonDropdown, Button, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroupAddon } from 'reactstrap';
import navLogo from '../img/GXnavlogo.png';
import '../Style/navBar.css';


const nLogo = [navLogo];


export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      splitButtonOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }


  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen,
    });
  }


  render() {
    return (
      <div>
        <Navbar color="#b503c5" light expand="md">
          <NavbarBrand href="/">
            <img src={nLogo} alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nLinks" href="">Trades</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nLinks" href="">My Prof</NavLink>
              </NavItem>
              <InputGroup>
                <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
                  <Button outline>Console</Button>
                  <DropdownToggle split outline />
                  <DropdownMenu>
                    <DropdownItem>Ps4</DropdownItem>
                    <DropdownItem>Xbox1</DropdownItem>
                    <DropdownItem>Switch</DropdownItem>
                    <DropdownItem>PC</DropdownItem>
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input placeholder="Game Title" />
                <InputGroupAddon addonType="append"><Button color="secondary">Search</Button></InputGroupAddon>
              </InputGroup>
              <NavItem>
                <NavLink className="loginLinks" href="">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="loginLinks" href="">Register</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
