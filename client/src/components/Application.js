import React from "react";
import { Button, Card, CardHeader, CardTitle, CardSubtitle, CardBody, CardText } from "reactstrap"
import styled from "styled-components";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const AppCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  border-radius: 5px;
  margin: 10px;
  cursor: pointer;
`;

const AppStepper = styled(Stepper)`
  background-color: white;
  width: 100%;
`;

function Application(props) {

  function clickViewButton() {
    props.onSelectApplication(props.id);
  }

  let stages = {
    "Applied": 1,
    "Phone Screen": 2,
    "Interview": 3,
    "Offer": 4
  }

  return (
    <React.Fragment>
      <AppCard onClick={() => clickViewButton()}>
        <CardHeader>
          <CardTitle>
            <h3>{props.title}</h3>
          </CardTitle>
          <CardSubtitle>
            <h4>{props.company} - {props.location}</h4>
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          <CardText>
            {props.stage !== "Denied" &&
              <AppStepper activeStep={stages[props.stage]}>
                <Step key={1}>
                  <StepLabel>Applied</StepLabel>
                </Step>
                <Step key={2}>
                  <StepLabel>Phone Screen</StepLabel>
                </Step>
                <Step key={3}>
                  <StepLabel>Interview</StepLabel>
                </Step>
                <Step key={4}>
                  <StepLabel>Offer</StepLabel>
                </Step>
              </AppStepper>
            }
            <h4>Summary</h4>
            <p>{props.summary}</p>
          </CardText>
        </CardBody>
      </AppCard>
    </React.Fragment>
  );
}

export default Application;