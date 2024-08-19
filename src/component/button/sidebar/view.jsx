import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Sidebar() {
  return (
    <div className="d-flex">
      <Navbar bg="dark" variant="dark" className="flex-column vh-100 p-3">
        <Navbar.Brand href="#dashboard">My App</Navbar.Brand>
        <Nav className="flex-column">
          <Nav.Link href="#dashboard">Dashboard</Nav.Link>
          <Nav.Link href="#userlist">User List</Nav.Link>
          <Nav.Link href="#productlist">Product List</Nav.Link>
          <Nav.Link href="#orderlist">Order List</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}
