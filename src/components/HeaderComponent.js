import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, PageHeader, FormGroup, FormControl, Button } from 'react-bootstrap';

class HeaderComponent extends Component {
  render() {
    return (
      
        <Navbar className="custom-navbar-style">
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Plan your trip</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
    );
  }
};

export default HeaderComponent;