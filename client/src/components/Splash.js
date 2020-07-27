import React from "react";
import styled from "styled-components";
import { Jumbotron, Button, Container, Media } from "reactstrap";

function Splash() {

  const Hero = styled(Jumbotron)`
    background-color: #0E5A8A;
    width: 100%;
    border-radius: 0;
    min-height: 60vh;
    margin: 0;
    text-align: center;
    color: white;
    padding: 200px 0;
  `;

  const Info = styled(Jumbotron)`
    background-color: #48AFF0;
    border-radius: 0;
    width: 100%;
    text-align: center;
    color: white;
    margin: 0;
  `;

  const HeroButton = styled(Button)`
    margin: 10px;
  `;

  const Img = styled.img`
    width: 25%;
    opacity: 85%;
    box-shadow: 1px 3px 3px black;
    border: 1px solid black;
    margin: 10px;
  `;

  return (
    <React.Fragment>
      <Hero>
        <Container>
          <h1>JOB APPLICATIONS MADE EASY</h1>
          <p>Search for jobs and manage your applications.</p>
          <HeroButton color="warning" href="/signin">Register</HeroButton>
          <HeroButton color="warning" href="/signin">Sign In</HeroButton>
        </Container>
      </Hero>
      <Info>
        <h2>What is JobIO?</h2>
        <p>Look at these charts</p>
        <Img src="https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
        <Img src="https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
      </Info>
    </React.Fragment>
  );
}

export default Splash;