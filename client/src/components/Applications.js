import React from "react";
import App from "./App";
import ApplicationList from "./ApplicationList";
import { Container, Jumbotron } from "reactstrap";
import styled from "styled-components";

function Applications(props) {

  const ApplicationsContainer = styled(Container)`
    padding-top: 200px;
  `;

  return (
    <React.Fragment>
      <ApplicationsContainer>
        <Jumbotron>
          <h1>Applications</h1>
        </Jumbotron>
        <ApplicationList
          onClickEdit={props.onClickEdit}
          onSelectApplication={props.onSelectApplication}
        />
      </ApplicationsContainer>
    </React.Fragment>
  );
}

export default Applications;