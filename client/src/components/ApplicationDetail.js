import React from "react";
import { Jumbotron } from "reactstrap";

function ApplicationDetail(props) {
  const { application } = props;
  return (
    <React.Fragment>
      <Jumbotron>
        <h3>{application.title}</h3>
        <h4>{application.company} - {application.location}</h4>
        <p>Applied: {application.appliedDate.toDate().toString()}</p>
        <p>Stage: {application.stage}</p>
      </Jumbotron>
    </React.Fragment>
  );
}

export default ApplicationDetail;