import React from "react";
import firebase from "firebase/app";
import { Form, Button, Input } from "reactstrap";
import { useState } from "react";
import { Redirect } from "react-router-dom";

function SignIn() {

  const [userSignedIn, updateUserSignedIn] = useState(false);

  function signInUser(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        updateUserSignedIn(true);
        console.log("Signed in successfully");
      }).catch((error) => {
        console.log(error.message);
      });
  }

  if (userSignedIn) {
    return <Redirect to="/dashboard" />
  } else {
    return (
      <React.Fragment>
        <h1>Sign In</h1>
        <Form onSubmit={signInUser}>
          <Input
            type="text"
            name="email"
            placeholder="Email" />
          <Input
            type="password"
            name="password"
            placeholder="Password" />
          <Button type="submit" color="warning">Sign In</Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default SignIn;