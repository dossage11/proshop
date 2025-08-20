import React from 'react'

import { Container, Navbar,Nav,Row,Col, NavDropdown } from 'react-bootstrap'
import { Link, Links, NavLink } from 'react-router-dom'
import useAuthStore from '../store/authStore'
function Header() {

  const { user, isAuthenticated, logout } = useAuthStore()

  const isLoggedIn = isAuthenticated


   


  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) { 
     logout()
      window.location.href = "/login";
    }
  }

  return (
     <Navbar expand="lg"  collapseOnSelect className="bg-dark text-white" variant='dark'>
      <Container>
        <Row>
  <Col>
    

        <Navbar.Brand href='/'>React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
       
  </Col>
        </Row>
  
  <Row>
<Col>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
             {isLoggedIn ? (
              <>
            <NavLink to="/" className="nav-link"><i className='fas fa-home'></i>Home</NavLink>
            <NavLink to="/cart" className="nav-link"><i className='fas fa-shopping-cart'></i>Cart</NavLink>

           
                <NavDropdown title={<span>{user.name}</span>} id="username">
                  <Link to="/profile" className="nav-link">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Link>
                  <Link onClick={handleLogout} className="nav-link">
                      <NavDropdown.Item>Logout</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              </>
            ) : (
              <NavLink to="/login" className="nav-link"><i className='fas fa-user'></i>Sign-In</NavLink>
            )}
            
          </Nav>
        </Navbar.Collapse>
</Col>
  </Row>
      </Container>
    </Navbar>
  )
}

export default Header