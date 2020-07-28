import React from "react";
import { Button } from "reactstrap";
import { Form, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";

function FollowUp(props) {

  const firestore = useFirestore();
  const [modal, setModal] = useState(false);

  function onEditClick() {
    setModal(!modal);
  }

  function editSubmissionHandler(event) {
    event.preventDefault();

    const propsToUpdate = {
      date: event.target.date.value,
      contactName: event.target.name.value,
      contactEmail: event.target.email.value,
      contactPhone: event.target.phone.value
    };

    setModal(!modal);

    return firestore.update({
      collection: "followups",
      doc: props.id
    }, propsToUpdate);
  }

  function deleteFollowUp(id) {
    firestore.delete({ collection: "followups", doc: id });
    setModal(!modal);
  }

  return (
    <React.Fragment>
      <h4>{props.date}</h4>
      <p>{props.name}</p>
      <p>{props.phone}</p>
      <p>{props.email}</p>
      <Button onClick={() => onEditClick()}>Edit</Button>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Follow Up</ModalHeader>
        <ModalBody>
          <Form onSubmit={editSubmissionHandler}>
            <Input name="date" defaultValue={props.date} />
            <Input name="name" defaultValue={props.name} />
            <Input name="phone" defaultValue={props.phone} />
            <Input name="email" defaultValue={props.email} />
            <Button type="submit">Save</Button>
          </Form>
          <Button onClick={() => deleteFollowUp(props.id)}>Delete</Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default FollowUp;