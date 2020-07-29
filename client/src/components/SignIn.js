import React from "react";
import firebase from "firebase/app";
import { Container, Form, Button, Input, Label, Jumbotron, Spinner } from "reactstrap";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

const SignInTron = styled(Jumbotron)`
    margin-top: 100px;
    box-shadow: 1px 2px 2px black;
    width: 30%;
`;

const SignInLabel = styled(Label)`
  font-weight: bold;
`;

const SignInContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const SignInButton = styled(Button)`
  margin: 5px;
  box-shadow: 1px 1px 1px black;
`;

function SignIn(props) {

  const [userSignedIn, updateUserSignedIn] = useState(false);

  function signInUser(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        let action = {
          type: "USER_SIGNIN",
          user: email
        }
        props.dispatch(action);
        setTimeout(() => {
          updateUserSignedIn(true);
        }, 10)

        console.log("Signed in successfully");
        console.log(action.user);
      }).catch((error) => {
        console.log(error.message);
      });
  }

  if (userSignedIn) {
    return <Redirect to="/dashboard" />

  } else {
    return (
      <React.Fragment>
        <SignInContainer>
          <SignInTron>
            <h3>Sign In</h3>
            <hr />
            <Form onSubmit={signInUser}>
              <SignInLabel for="email">Email</SignInLabel>
              <Input
                type="text"
                name="email"
                placeholder="Email" />
              <SignInLabel for="password">Password</SignInLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password" />
              <hr />
              <SignInButton type="submit" color="warning">Sign In</SignInButton>
            </Form>
          </SignInTron>
        </SignInContainer>

      </React.Fragment>
    );
  }
}

export default connect()(SignIn);