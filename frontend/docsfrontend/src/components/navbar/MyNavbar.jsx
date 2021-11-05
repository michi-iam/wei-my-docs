import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import { Nav, NavDropdown, Container } from 'react-bootstrap';

class MyNavbar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            x: false, 

        }

      }

    
      render() {
          return (
            <Navbar id="myNavbar" expand="lg">
            <Container>
              <Navbar.Brand href="/">Wei-My-Docs</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Suchen</Nav.Link>
                  <NavDropdown title="Neu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/new">Neuer Eintrag</NavDropdown.Item>
                    <NavDropdown.Item href="/newtag">Neues Tag</NavDropdown.Item>
                    
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          )
      }
}

export default MyNavbar;