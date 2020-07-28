import React from "react";
import { Navbar, Nav, NavbarBrand, NavItem, NavLink } from "reactstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "firebase/auth";
import firebase from "../firebase";

function Header(props) {

  const FixedNav = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
    z-index: 3;
  `;

  const RightNav = styled(Nav)`
    right: 0;
    position: absolute;
    margin-right: 20px;
  `;

  function viewPage(page) {

    const { dispatch } = props
    let actionType;

    switch (page) {
      case "Dashboard":
        actionType = "NO_SEARCH";
        dispatch({ type: actionType });
        actionType = "NO_MANAGE";
        dispatch({ type: actionType });
        actionType = "NO_APPLICATIONS";
        dispatch({ type: actionType });
        actionType = "DESELECT_APPLICATION";
        break;
      case "Search":
        actionType = "TOGGLE_SEARCH";
        dispatch({ type: actionType });
        actionType = "NO_MANAGE";
        dispatch({ type: actionType });
        actionType = "DESELECT_APPLICATION";
        break;
      case "Applications":
        actionType = "VIEW_APPLICATIONS";
        dispatch({ type: actionType });
        actionType = "NO_MANAGE";
        dispatch({ type: actionType });
        actionType = "DESELECT_APPLICATION";
        break;
      default:
    }

    console.log(page);

    let action = {
      type: actionType
    }

    dispatch(action);
  }

  function userSignOut() {
    firebase.auth().signOut().then(() => {
      console.log("SIGNED OUT");
      let action = {
        type: "USER_SIGNOUT"
      }
      props.dispatch(action);
    }).catch((error) => {
      console.log(error.message);
    })
  }

  return (
    <React.Fragment>
      <FixedNav>
        <Navbar className="navbar-dark bg-dark" expand="md">
          <Link to="/"><NavbarBrand>JobIO</NavbarBrand></Link>
          {props.currentUser !== null &&
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link to="/dashboard" onClick={() => viewPage("Dashboard")}><NavLink>Dashboard</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/applications" onClick={() => viewPage("Applications")}><NavLink>Applications</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/search" onClick={() => viewPage("Search")}><NavLink>Search</NavLink></Link>
              </NavItem>
            </Nav>}
          {props.currentUser !== null &&
            <RightNav navbar>
              <NavItem>
                <NavLink>Hello, {props.currentUser.email}</NavLink>
              </NavItem>
              <NavItem>
                <Link><NavLink onClick={() => userSignOut()}>Sign Out</NavLink></Link>
              </NavItem>
            </RightNav>}

          {props.currentUser === null &&
            <RightNav navbar>
              <NavItem>
                <Link to="/signin"><NavLink>Sign In</NavLink></Link>
              </NavItem>
              <NavItem>
                <Link to="/register"><NavLink>Register</NavLink></Link>
              </NavItem>
            </RightNav>}
        </Navbar>
      </FixedNav>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Header);