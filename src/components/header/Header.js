import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useDispatch} from 'react-redux';
import { userLogOut } from "../../pages/admin-auth-slice/userAction";


export const Header = () => {
  const dispatch =useDispatch()

  const handleOnLogout = () =>{
    dispatch(userLogOut());
  }

    return (
        <div>
            <Navbar collapseOneSelect bg="info" expand="md">
  <Container>
      <LinkContainer to="/dashboard">
    <Navbar.Brand href="#home">Admin</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
          
          <Nav.Link onClick={handleOnLogout}>Log out</Nav.Link>
        
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
            
        </div>
    )
};
