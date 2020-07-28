import React from "react";
import firebase from "firebase/app";
import { Form, Button, Input } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useState } from "react";

function Register() {

  const [registered, updateRegistered] = useState(false);

  function registerUser(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("successfully registered");
        updateRegistered(true);
      }).catch((error) => {
        console.log(error.message);
      });
  }

  if (registered) {
    return <Redirect to="/signin" />
  } else {
    return (
      <React.Fragment>
        <h1>Register</h1>
        <Form onSubmit={registerUser}>
          <Input
            type="text"
            name="email"
            placeholder="Email" />
          <Input
            type="password"
            name="password"
            placeholder="Password" />
          <Button color="warning" type="submit">Register</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Register;