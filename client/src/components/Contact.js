import React from "react";
import { Button } from "reactstrap";
import { useState } from "react";
import { Form, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardTitle, CardText, CardBody } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import styled from "styled-components";

const ContactCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  margin: 5px;
  cursor: pointer;
`;

const ModalButton = styled(Button)`
  margin: 5px;
  box-shadow: 1px 1px 1px black;
`;

function Contact(props) {

  const firestore = useFirestore();
  const [modal, setModal] = useState(false);

  function onEditClick() {
    setModal(!modal);
  }

  function editSubmissionHandler(event) {
    event.preventDefault();

    const propsToUpdate = {
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value
    };

    setModal(!modal);

    return firestore.update({
      collection: "contacts",
      doc: props.id
    }, propsToUpdate);
  }

  function deleteContact(id) {
    firestore.delete({ collection: "contacts", doc: id });
    setModal(!modal);
  }

  return (
    <React.Fragment>
      <ContactCard onClick={() => onEditClick()}>
        <CardHeader>
          <CardTitle><strong>{props.name}</strong></CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            <p>Email: {props.email}</p>
            <p>Phone: {props.phone}</p>
          </CardText>
        </CardBody>
      </ContactCard>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Contact</ModalHeader>
        <ModalBody>
          <Form onSubmit={editSubmissionHandler}>
            <Label for="name"><strong>Name</strong></Label>
            <Input name="name" defaultValue={props.name} />
            <Label for="email"><strong>Email</strong></Label>
            <Input name="email" defaultValue={props.email} />
            <Label for="phone"><strong>Phone</strong></Label>
            <Input name="phone" defaultValue={props.phone} />
            <hr />
            <ModalButton type="submit" color="primary">Save</ModalButton>
            <ModalButton onClick={() => deleteContact(props.id)} color="danger">Delete</ModalButton>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment >
  );
}

export default Contact;