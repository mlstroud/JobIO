import React from "react";

function Contact(props) {
  return (
    <React.Fragment>
      <h4>{props.name}</h4>
      <p>{props.email}</p>
      <p>{props.phone}</p>
    </React.Fragment>
  );
}

export default Contact;