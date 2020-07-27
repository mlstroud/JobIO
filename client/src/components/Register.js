import React from "react";
import firebase from "firebase/app";
import { Form, Button, Input } from "reactstrap";

function Register() {
  return (
    <React.Fragment>
      <h1>Register</h1>
      <Form>
        <Input
          type="text"
          name="email"
          placeholder="Email" />
        <Input
          type="password"
          name="passwordd"
          placeholder="Password" />
        <Button color="warning" type="submit">Register</Button>
      </Form>
    </React.Fragment>
  );
}

export default Register;