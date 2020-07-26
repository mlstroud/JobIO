import React from "react";

function Job(props) {
  return (
    <React.Fragment>
      <h3>{props.title}</h3>
      <h4>{props.company} - {props.location}</h4>
      <p>{props.summary}</p>
    </React.Fragment>
  );
}

export default Job;