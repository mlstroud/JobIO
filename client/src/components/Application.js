import React from "react";

function Application(props) {
  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      <h4>{props.company} - {props.location}</h4>
      <p>Applied: {props.appliedDate.toDate().toString()}</p>
      <p>Stage: {props.stage}</p>
      <hr />
    </React.Fragment>
  );
}

export default Application;