import React from "react";
import { Button } from "reactstrap";
import { useState } from "react";
import { Form, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFirestore } from "react-redux-firebase";

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
      <h4>{props.name}</h4>
      <p>{props.email}</p>
      <p>{props.phone}</p>
      <Button onClick={() => onEditClick()}>Edit</Button>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Contact</ModalHeader>
        <ModalBody>
          <Form onSubmit={editSubmissionHandler}>
            <Input name="name" defaultValue={props.name} />
            <Input name="email" defaultValue={props.email} />
            <Input name="phone" defaultValue={props.phone} />
            <Button type="submit">Save</Button>
          </Form>
          <Button onClick={() => deleteContact(props.id)}>Delete</Button>
        </ModalBody>
      </Modal>
    </React.Fragment >
  );
}

export default Contact;