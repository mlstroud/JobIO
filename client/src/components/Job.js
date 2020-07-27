import React from "react";
import styled from "styled-components";
import { Button, Card, CardBody, CardTitle, CardHeader, CardSubtitle, CardText } from "reactstrap";

function Job(props) {

  const JobCard = styled(Card)`
    text-align: left;
    background-color: #F5F8FA;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 1px #182026;
  `;

  const ButtonDiv = styled.div`
    float: right;
  `;

  function buttonClickHandler() {
    props.addJobToFirestore({
      title: props.title,
      company: props.company,
      location: props.location,
      summary: props.summary,
      stage: "applied"
    });
  }

  return (
    <React.Fragment>
      <JobCard>
        <CardHeader>
          <CardTitle><h3><a href={props.url} target="_blank">{props.title}</a></h3></CardTitle>
          <CardSubtitle>{props.company} - {props.location}</CardSubtitle>
        </CardHeader>
        <CardBody>
          <CardText>
            {props.summary.split(".").map((sentence) => { return sentence + "\n"; })}
          </CardText>
          <ButtonDiv>
            <Button color="primary" onClick={() => buttonClickHandler()}>Add Job</Button>
          </ButtonDiv>
        </CardBody>
      </JobCard>
    </React.Fragment>
  );
}

export default Job;