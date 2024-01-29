import React from 'react'
import { Navbar, Nav, NavDropdown, Form, Container } from 'react-bootstrap';

export default function NavBar () {
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand>My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action1">Action 1</NavDropdown.Item>
                                <NavDropdown.Item href="#action2">Action 2</NavDropdown.Item>
                                <NavDropdown.Item href="#action3">About</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
        </Container>
    </Navbar>
}