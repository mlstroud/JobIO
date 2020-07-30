import React from "react";
import firebase from "firebase/app";
import { Container, Form, Button, Input, Label, Jumbotron } from "reactstrap";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const RegisterTron = styled(Jumbotron)`
    margin-top: 100px;
    box-shadow: 1px 2px 2px black;
    width: 30%;
`;

const RegisterLabel = styled(Label)`
  font-weight: bold;
`;

const RegisterContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const RegisterButton = styled(Button)`
  margin: 5px;
  box-shadow: 1px 1px 1px black;
`;

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
        <RegisterContainer>
          <RegisterTron>
            <h3>Register</h3>
            <hr />
            <Form onSubmit={registerUser}>
              <RegisterLabel for="email">Email</RegisterLabel>
              <Input
                type="text"
                name="email"
                placeholder="Email" />
              <RegisterLabel for="password">Password</RegisterLabel>
              <Input
                type="password"
                name="password"
                placeholder="Password" />
              <hr />
              <RegisterButton color="warning" type="submit">Register</RegisterButton>
            </Form>
          </RegisterTron>
        </RegisterContainer>
      </React.Fragment>
    );
  }
}

export default Register;