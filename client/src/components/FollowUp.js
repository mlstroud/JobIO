import React from "react";
import { Button } from "reactstrap";
import { Form, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import styled from "styled-components";

const FollowUpCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  margin: 5px;
  cursor: pointer;
`;

const ModalButton = styled(Button)`
  margin: 5px;
  box-shadow: 1px 1px 1px black;
`;

const ModalLabel = styled(Label)`
  font-weight: bold;
`;

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
      <FollowUpCard onClick={() => onEditClick()}>
        <CardHeader>
          <CardTitle><strong>{props.date}</strong></CardTitle>
        </CardHeader>
        <CardBody>
          <CardText>
            <p>With: {props.name}</p>
            <p>Email: {props.email}</p>
            <p>Phone: {props.phone}</p>
          </CardText>
        </CardBody>
      </FollowUpCard>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Follow Up</ModalHeader>
        <ModalBody>
          <Form onSubmit={editSubmissionHandler}>
            <ModalLabel for="date">Date</ModalLabel>
            <Input name="date" defaultValue={props.date} />
            <ModalLabel for="name">Name</ModalLabel>
            <Input name="name" defaultValue={props.name} />
            <ModalLabel for="email">Email</ModalLabel>
            <Input name="email" defaultValue={props.email} />
            <ModalLabel for="phone">Phone</ModalLabel>
            <Input name="phone" defaultValue={props.phone} />
            <hr />
            <ModalButton type="submit" color="primary">Save</ModalButton>
            <ModalButton onClick={() => deleteFollowUp(props.id)} color="danger">Delete</ModalButton>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default FollowUp;