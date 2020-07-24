import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";

function Header() {

  const FixedNav = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
  `;

  return (
    <React.Fragment>
      <FixedNav>
        <Navbar className="navbar-dark bg-dark" expand="md">
          <NavbarBrand>JobIO</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Applications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Search</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </FixedNav>
    </React.Fragment>
  );
}

export default Header;