import React from "react";
import styled from "styled-components";
import { Col, Row } from "reactstrap";

function Footer() {

  const FooterBar = styled.div`
    padding 50px;
    background-color: #182026;
    color: white;
    height: 200px;
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

  const ListLink = styled.a`
  color: white;

  &a:hover: {
    color: white;
  }

  &active: {
    color: white;
  }

  &visited: {
    color: white;
  }

  &link: {
    color: white;
  }
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
                <ListHeader>Resources</ListHeader>
                <ListItem><ListLink href="https://www.indeeed.com" target="_blank">Indeed</ListLink></ListItem>
                <ListItem><ListLink href="https://www.linkedin.com" target="_blank">LinkedIn</ListLink></ListItem>
                <ListItem><ListLink href="https://www.ziprecruiter.com" target="_blank">ZipRecruiter</ListLink></ListItem>
              </FooterList>
              <FooterList>
                <ListHeader>&nbsp;</ListHeader>
                <ListItem><ListLink href="https://www.glassdoor.com" target="_blank">Glassdoor</ListLink></ListItem>
                <ListItem><ListLink href="https://www.monster.com" target="_blank">Monster</ListLink></ListItem>
                <ListItem><ListLink href="https://www.snagajob.com" target="_blank">Snagajob</ListLink></ListItem>
              </FooterList>
            </ListContainer>

          </Col>
        </Row>
      </FooterBar>
    </React.Fragment>
  );
}

export default Footer;