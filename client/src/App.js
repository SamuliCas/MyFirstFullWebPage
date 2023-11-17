import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';

function App() {
  //State to store data fethced from backend
  const [backendData, setBackendData] = useState([{}])

  // States to handle username input and password input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  //Fetch data from the backend
  useEffect(() => {
    fetch("/users")
      .then(response => response.json())
      .then(data => {
        setBackendData(data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle the registration when the "Register" button is clicked
  const handleLogin = () => {
    fetch("/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error("Error adding user:", error);
      });
      // Reload the page after registration
      window.location.reload();
  };


  return (
    <div>
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

      <Container>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>
            Register
          </Button>
        </Form>
      </Container>

      {/* Just simple way to display backend data */}
      {backendData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        backendData.map((user, i) => (
          <p key={i}>{user.username}</p>
        ))
      )}

    </div>
  )
}

export default App