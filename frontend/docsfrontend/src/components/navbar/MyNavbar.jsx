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
            <Navbar bg="warning" expand="lg">
            <Container>
              <Navbar.Brand href="#home">Wei-My-Docs</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/">Suchen</Nav.Link>
                  <Nav.Link href="/new">Neu</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          )
      }
}

export default MyNavbar;