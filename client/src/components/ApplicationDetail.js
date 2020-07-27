import React from "react";
import { Jumbotron, Button } from "reactstrap";

function ApplicationDetail(props) {
  const { application, onClickingEdit, onClickingDelete } = props;
  return (
    <React.Fragment>
      <Jumbotron>
        <h3>{application.title}</h3>
        <h4>{application.company} - {application.location}</h4>
        <p>Applied: {application.appliedDate.toDate().toString()}</p>
        <p>Stage: {application.stage}</p>
        <Button onClick={() => onClickingEdit()}>Edit</Button>
        <Button onClick={() => onClickingDelete(application.id)}>Delete</Button>
      </Jumbotron>
    </React.Fragment>
  );
}

export default ApplicationDetail;