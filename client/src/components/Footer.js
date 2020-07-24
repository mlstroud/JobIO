import React from "react";
import styled from "styled-components";
import { Col, Row } from "reactstrap";

function Footer() {

  const FooterBar = styled.div`
    padding 50px;
    background-color: #182026;
    color: white;
  `;

  const ListContainer = styled.div`
    display: flex;
  `;

  const FooterList = styled.ul`
    list-style-type: none;
    text-align: left;
    flex: 1;
  `;

  const ListHeader = styled.li`
    font-weight: bold;
    margin-bottom: 10px;
  `;

  const ListItem = styled.li`
  `;

  const Copyright = styled.div`
    text-align: left;
    padding-left: 35%;
  `;

  return (
    <React.Fragment>
      <FooterBar>
        <Row>
          <Col md="6">
            <Copyright>
              <h2>JobIO</h2>
              Copyright © 2020
            </Copyright>
          </Col>
          <Col md="6">
            <ListContainer>
              <FooterList>
                <ListHeader>JobIO</ListHeader>
                <ListItem>About</ListItem>
                <ListItem>Register</ListItem>
                <ListItem>Sign In</ListItem>
              </FooterList>

              <FooterList>
                <ListHeader>Legal</ListHeader>
                <ListItem>Test</ListItem>
                <ListItem>Test</ListItem>
              </FooterList>

              <FooterList>
                <ListHeader>Resources</ListHeader>
                <ListItem>Indeed</ListItem>
                <ListItem>LinkedIn</ListItem>
                <ListItem>ZipRecruiter</ListItem>
              </FooterList>
            </ListContainer>
          </Col>
        </Row>
      </FooterBar>
    </React.Fragment>
  );
}

export default Footer;