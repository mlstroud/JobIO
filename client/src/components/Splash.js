import React from "react";
import styled from "styled-components";
import { Jumbotron, Button } from "reactstrap";

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

  return (
    <React.Fragment>
      <Hero>
        <h1>JOB APPLICATIONS MADE EASY</h1>
        <p>Search for jobs and manage your applications.</p>
        <Button color="warning">Call To Action Here</Button>
      </Hero>
      <Info>
        <h2>What is JobIO?</h2>
        <p>Stuff stuff stuff</p>
      </Info>
    </React.Fragment>
  );
}

export default Splash;