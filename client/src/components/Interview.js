import React from "react";
import { Button } from "reactstrap";
import { Form, Input, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { useState } from "react";

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
      <h4>{props.date} - {props.time}</h4>
      <p>{props.type}</p>
      <p>{props.notes}</p>
      <Button onClick={() => onEditClick()}>Edit</Button>

      <Modal isOpen={modal} toggle={(() => setModal(!modal))}>
        <ModalHeader toggle={() => setModal(!modal)}>Edit Interview</ModalHeader>
        <ModalBody>
          <Form onSubmit={editSubmissionHandler}>
            <Input name="date" defaultValue={props.date} />
            <Input name="time" defaultValue={props.time} />
            <Input name="type" defaultValue={props.type} type="select">
              <option>Phone</option>
              <option>On Site</option>
              <option>Virtual</option>
            </Input>
            <Input name="notes" defaultValue={props.notes} />
            <Button type="submit">Save</Button>
          </Form>
          <Button onClick={() => deleteInterview(props.id)}>Delete</Button>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default Interview