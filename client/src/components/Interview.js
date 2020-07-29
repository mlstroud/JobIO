import React from "react";
import { Button } from "reactstrap";
import { Form, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardHeader, CardTitle, CardBody, CardText } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";
import styled from "styled-components";

const InterviewCard = styled(Card)`
  box-shadow: 1px 2px 2px black;
  margin: 5px;
  cursor: pointer;
`;

const ModalButton = styled(Button)`
  margin: 5px;
  box-shadow: 1px 1px 1px black;
`;

function Interview(props) {

  const firestore = useFirestore();
  const [modal, setModal] = useState(false);

  function onEditClick() {
    setModal(!modal);
  }

  function editSubmissionHandler(event) {
    event.preventDefault();

    const propsToUpdate = {
      date: event.target.date.value,
      time: event.target.time.value,
      type: event.target.type.value,
      notes: event.target.notes.value
    };

    setModal(!modal);

    return firestore.update({
      collection: "interviews",
      doc: props.id
    }, propsToUpdate);
  }

  function deleteInterview(id) {
    firestore.delete({ collection: "interviews", doc: id });
    setModal(!modal);
  }

  return (
    <React.Fragment>
      <InterviewCard onClick={() => onEditClick()}>
        <CardHeader>
          <CardTitle><strong>{props.date} - {props.time}</strong></CardTitle>
        </CardHeader>
        <CardBody>
          <p>Type: {props.type}</p>
          <p>Notes: {props.notes}</p>
        </CardBody>
      </InterviewCard>

      <Modal isOpen={modal} toggle={(() => setModal(!modal))}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Interview</ModalHeader>
        <ModalBody>
          <Form onSubmit={editSubmissionHandler}>
            <Label for="date"><strong>Date</strong></Label>
            <Input name="date" defaultValue={props.date} />
            <Label for="time"><strong>Time</strong></Label>
            <Input name="time" defaultValue={props.time} />
            <Label for="type"><strong>Type</strong></Label>
            <Input name="type" defaultValue={props.type} type="select">
              <option>Phone</option>
              <option>On Site</option>
              <option>Virtual</option>
            </Input>
            <Label for="notes"><strong>Notes</strong></Label>
            <Input name="notes" defaultValue={props.notes} />
            <hr />
            <ModalButton type="submit" color="primary">Save</ModalButton>
            <ModalButton onClick={() => deleteInterview(props.id)} color="danger">Delete</ModalButton>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default Interview