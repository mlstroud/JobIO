import React from "react";
import ContactList from "./ContactList";
import { Jumbotron, Button } from "reactstrap";
import { Form, Input } from "reactstrap";
import { useFirestore, firestoreReducer } from "react-redux-firebase";

function ApplicationDetail(props) {
  const { application, onClickingEdit, onClickingDelete } = props;
  const firestore = useFirestore();

  function onAddContact(event) {
    event.preventDefault();

    return firestore.collection("contacts").add({
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      appId: application.id
    });
  }

  return (
    <React.Fragment>
      <Jumbotron>
        <h3>{application.title}</h3>
        <h4>{application.company} - {application.location}</h4>
        <p>Applied: {application.appliedDate.toDate().toString()}</p>
        <p>Stage: {application.stage}</p>
        <h3>Contact List</h3>
        <Form onSubmit={onAddContact}>
          <Input name="name" placeholder="name" />
          <Input name="email" placeholder="email" />
          <Input name="phone" placeholder="phone" />
          <Button type="submit">Add Contact</Button>
        </Form>
        <ContactList appId={application.id} />
        <Button onClick={() => onClickingEdit()}>Edit</Button>
        <Button onClick={() => onClickingDelete(application.id)}>Delete</Button>
      </Jumbotron>
    </React.Fragment>
  );
}

export default ApplicationDetail;