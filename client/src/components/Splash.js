import React from "react";
import styled from "styled-components";
import { Jumbotron, Button } from "reactstrap";

function Splash() {

  const Hero = styled(Jumbotron)`
    background-color: #303f9f;
    width: 100%;
    border-radius: 0;
    min-height: 50vh;
    margin: 0;
    text-align: center;
    color: white;
  `;

  const Info = styled(Jumbotron)`
    background-color: #303f9f;
    border-radius: 0;
    width: 100%;
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
        Test
      </Info>
    </React.Fragment>
  );
}

export default Splash;