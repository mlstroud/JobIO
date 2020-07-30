import React from "react";
import styled from "styled-components";
import { Jumbotron, Button, Container, Media, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import DashImg from "../img/dashboard.png";
import AppImg from "../img/applications.png";
import IntImg from "../img/interview.png";
import SearchImg from "../img/search.png";
import CIcon from "@material-ui/icons/InsertChart";
import IIcon from "@material-ui/icons/Group";
import JIcon from "@material-ui/icons/Work";

const Hero = styled(Jumbotron)`
background-color: #0E5A8A;
width: 100%;
border-radius: 0;
min-height: 40vh;
margin: 0;
text-align: center;
color: white;
padding: 200px 0;
`;

const ChartIcon = styled(CIcon)`
  color: white;
  margin: 5px;
`;

const InterviewIcon = styled(IIcon)`
  color: white;
  margin: 5px;
`;

const JobIcon = styled(JIcon)`
  color: white;
  margin: 5px;
`;

const InfoColR = styled(Col)`
  text-align: left;
  padding-top: 50px;
`;

const InfoColL = styled(Col)`
  text-align: right;
`;

const Info = styled(Jumbotron)`
  background-color: #48AFF0;
  border-radius: 0;
  width: 100%;
  text-align: center;
  color: white;
  margin: 0;
  font-size: 16px;
`;
const HeroButton = styled(Button)`
  margin: 10px;
  box-shadow: 1px 1px 1px black;
`;

const Img = styled.img`
  width: 50%;
  opacity: 85%;
  box-shadow: 1px 3px 3px black;
  border: 1px solid black;
  margin: 10px;
  border-radius: 5px;
`;

function Splash(props) {

  return (
    <React.Fragment>
      <Hero>
        {props.currentUser === null &&
          <Container>
            <h1>JOB APPLICATIONS MADE EASY</h1>
            <p>Search for jobs and manage your applications.</p>
            <HeroButton color="warning" href="/register">Register</HeroButton>
            <HeroButton color="warning" href="/signin">Sign In</HeroButton>
          </Container>}
        {props.currentUser !== null &&
          <Container>
            <h1>Welcome, {props.currentUser.email}</h1>
          </Container>
        }
      </Hero>
      <Info>
        <h2>What is JobIO?</h2>
        <p>JobIO is a job application manager created to take some of the stress out of your job search.</p>
        <br />
        <br />
        <Row>
          <Col md="6">
            <Img src={DashImg} />
          </Col>
          <InfoColR md="6">
            <p><ChartIcon fontSize="large" /> Detailed analytics to help keep you accountable.</p>
            <p><JobIcon fontSize="large" /> Search popular job boards directly from JobIO.</p>
            <p><InterviewIcon fontSize="large" /> Manage interviews, follow ups, and contacts.</p>
          </InfoColR>
        </Row>
      </Info>
      <Info>
        <Row>
          <Col>
            <Img src={AppImg} />
          </Col>
          <Col>
            <Img src={IntImg} />
          </Col>
          <Col>
            <Img src={SearchImg} />
          </Col>
        </Row>
      </Info>
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(Splash);