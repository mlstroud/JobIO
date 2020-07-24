import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";
import { connect } from "react-redux";

function Header(props) {

  const FixedNav = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
  `;

  function viewPage(page) {

    const { dispatch } = props
    let actionType;

    switch (page) {
      case "Search":
        console.log(1);
        actionType = "TOGGLE_SEARCH";
      default:
    }

    console.log(page);

    let action = {
      type: actionType
    }
    console.log(action);
    dispatch(action);
  }

  return (
    <React.Fragment>
      <FixedNav>
        <Navbar className="navbar-dark bg-dark" expand="md">
          <NavbarBrand>JobIO</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#" onClick={() => viewPage("Home")}>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => viewPage("Dashboard")}>Dashboard</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => viewPage("Applications")}>Applications</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" onClick={() => viewPage("Search")}>Search</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </FixedNav>
    </React.Fragment>
  );
}

export default connect()(Header);