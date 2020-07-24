import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";

function Header() {

  function stuff() {
    alert("yaya");
  }

  return (
    <React.Fragment>
      <div>
        <Navbar className="navbar-dark bg-dark" expand="md">
          <NavbarBrand>JobIO</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Applications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="">Search</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    </React.Fragment>
  );
}

export default Header;