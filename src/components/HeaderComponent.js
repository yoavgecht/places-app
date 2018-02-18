import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, PageHeader, FormGroup, FormControl, Button } from 'react-bootstrap';

class HeaderComponent extends Component {
  render() {
    return (
      
        <Navbar className="custom-navbar-style">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Plan your trip</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/add-destinations">
              Add Destinations
            </NavItem>
            <NavItem eventKey={2} href="/">
              Show Destinations
            </NavItem>
          </Nav>
        </Navbar>
    );
  }
};

export default HeaderComponent;