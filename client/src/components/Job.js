import React from "react";
import styled from "styled-components";
import { Button, Card, CardBody, CardTitle, CardHeader, CardSubtitle, CardText } from "reactstrap";

function Job(props) {

  const JobCard = styled(Card)`
    text-align: left;
    background-color: #F5F8FA;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 1px 2px 2px black;
  `;

  const JobButton = styled(Button)`
    box-shadow: 1px 1px 1px black;
  `;

  const JobLink = styled.a`
    color: black;

    &hover: {
      color: black;
    }

    &active: {
      color: black;
    }

    &visited: {
      color: black;
    }

    &link: {
      color: black;
    }
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
      stage: "Applied",
      user: props.user
    });
  }

  console.log(props);

  return (
    <React.Fragment>
      <JobCard>
        <CardHeader>
          <CardTitle><h3><JobLink href={props.url} target="_blank">{props.title}</JobLink></h3></CardTitle>
          <CardSubtitle>{props.company} - {props.location}</CardSubtitle>
        </CardHeader>
        <CardBody>
          <CardText>
            {props.summary.split(".").map((sentence) => { return sentence + "\n"; })}
          </CardText>
          <ButtonDiv>
            <JobButton color="primary" onClick={() => buttonClickHandler()}>Add Job</JobButton>
          </ButtonDiv>
        </CardBody>
      </JobCard>
    </React.Fragment>
  );
}

export default Job;