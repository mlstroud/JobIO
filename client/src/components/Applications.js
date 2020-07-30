import React from "react";
import App from "./App";
import ApplicationList from "./ApplicationList";
import { Container, Jumbotron } from "reactstrap";
import styled from "styled-components";

function Applications(props) {

  const ApplicationsContainer = styled(Container)`
    padding-top: 100px;
  `;

  const AppTron = styled(Jumbotron)`
    text-align: center;
    background-color: #CED9E0;
  `;

  return (
    <React.Fragment>
      <ApplicationsContainer>
        <AppTron>
          <h1>Applications</h1>
        </AppTron>
        <ApplicationList
          onClickEdit={props.onClickEdit}
          onSelectApplication={props.onSelectApplication}
        />
      </ApplicationsContainer>
    </React.Fragment>
  );
}

export default Applications;