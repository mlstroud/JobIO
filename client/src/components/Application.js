import React from "react";
import { Button } from "reactstrap";

function Application(props) {

  function clickEditButton() {
    props.onSelectApplication(props.id);
  }

  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      <h4>{props.company} - {props.location}</h4>
      <p>Applied: {props.appliedDate.toDate().toString()}</p>
      <p>Stage: {props.stage}</p>
      <Button onClick={() => clickEditButton()}>Edit</Button>
      <hr />
    </React.Fragment>
  );
}

export default Application;