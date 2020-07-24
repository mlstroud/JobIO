import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";

function Header() {

  function stuff() {
    alert("yaya");
  }

  return (
    <React.Fragment>
      <div>
        <Navbar className="navbar-dark bg-dark">
          <NavbarBrand>JobIO</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="" onClick={() => stuff()}>Test</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    </React.Fragment>
  );
}

export default Header;