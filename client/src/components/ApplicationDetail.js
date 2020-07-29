import React from "react";
import ContactList from "./ContactList";
import FollowUpList from "./FollowUpList";
import InterviewList from "./InterviewList";
import { Container, Jumbotron, Button } from "reactstrap";
import { Form, Input } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Card } from "reactstrap";
import styled from "styled-components";

const AppTron = styled(Jumbotron)`
  margin-top: 200px;
  box-shadow: 1px 2x 2px black;
`;

const AppProgress = styled.ul`
  li.active {
    color: success;
  }
  li.active:before {
    border-color: success;
    background-color: success;
  }
  li.active + li:after {
    background-color: success;
  }
`;

function ApplicationDetail(props) {
  const { application, onClickingEdit, onClickingDelete } = props;
  const firestore = useFirestore();

  const [contacts, setContacts] = useState(null);
  const [followUps, setFollowUps] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [contactModal, setContactModal] = useState(false);
  const [followUpsModal, setFollowUpsModal] = useState(false);
  const [interviewModal, setInterviewModal] = useState(false);

  useEffect(() => {
    let contactData = [];
    let followUpData = [];
    let interviewData = [];

    firestore.collection("contacts").where("appId", "==", application.id).get()
      .then((results) => {
        results.forEach((doc) => {
          contactData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        setContacts(contactData);
      }).catch((error) => {
        console.log(error.message);
      });

    firestore.collection("followups").where("appId", "==", application.id).get()
      .then((results) => {
        results.forEach((doc) => {
          followUpData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        setFollowUps(followUpData);
      }).catch((error) => {
        console.log(error.message);
      });

    firestore.collection("interviews").where("appId", "==", application.id).get()
      .then((results) => {
        results.forEach((doc) => {
          interviewData.push({
            data: doc.data(),
            id: doc.id
          });
          setInterviews(interviewData);
        });
      }).catch((error) => {
        console.log(error.message);
      });

  }, []);

  function onAddContact(event) {
    event.preventDefault();
    setContactModal(!contactModal);

    return firestore.collection("contacts").add({
      name: event.target.name.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      appId: application.id
    });
  }

  function onAddFollowUp(event) {
    event.preventDefault();
    setFollowUpsModal(!followUpsModal);

    const followUpContact = contacts.filter(c => c.id == event.target.contact.value)[0];

    return firestore.collection("followups").add({
      date: event.target.date.value,
      contactName: followUpContact.data.name,
      contactEmail: followUpContact.data.email,
      contactPhone: followUpContact.data.phone,
      user: props.currentUser.email,
      appId: application.id
    });
  }

  function onAddInterview(event) {
    event.preventDefault();
    setInterviewModal(!interviewModal);

    return firestore.collection("interviews").add({
      date: event.target.date.value,
      time: event.target.time.value,
      type: event.target.type.value,
      notes: event.target.notes.value,
      user: props.currentUser.email,
      appId: application.id
    });
  }

  return (
    <React.Fragment>
      <Container>
        <AppTron>
          <AppProgress>
            <li>Test</li>
            <li>Test</li>
            <li>Test</li>
          </AppProgress>
          <h3>{application.title}</h3>
          <h4>{application.company} - {application.location}</h4>
          <p>Applied: {application.appliedDate.toDate().toString()}</p>
          <p>Stage: {application.stage}</p>
          <h3>Contact List</h3>
          <Button onClick={() => setContactModal(true)}>Add Contact</Button>
          <ContactList contacts={contacts} appId={application.id} />
          <hr />
          <h3>Follow Ups</h3>
          <Button onClick={() => setFollowUpsModal(true)}>Add Follow Up</Button>
          <FollowUpList followups={followUps} appId={application.id} />
          <hr />
          <h3>Interviews</h3>
          <Button onClick={() => setInterviewModal(true)}>Add Interview</Button>
          <InterviewList interviews={interviews} appId={application.id} />
          <hr />
          <Button onClick={() => onClickingEdit()}>Edit</Button>
          <Button onClick={() => onClickingDelete(application.id)}>Delete</Button>
        </AppTron>
      </Container>

      <Modal isOpen={contactModal} toggle={() => setContactModal(!contactModal)}>
        <ModalHeader toggle={() => setContactModal(!contactModal)}>Add Contact</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddContact}>
            <Input name="name" placeholder="name" />
            <Input name="email" placeholder="email" />
            <Input name="phone" placeholder="phone" />
            <Button type="submit">Add Contact</Button>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={followUpsModal} toggle={() => setFollowUpsModal(!followUpsModal)}>
        <ModalHeader toggle={() => setFollowUpsModal(!followUpsModal)}>Add Follow Up</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddFollowUp}>
            <Input name="date" placeholder="date" />
            <Input name="contact" type="select">
              {contacts !== null && contacts.map((contact) => {
                return <option value={contact.id} key={contact.id}>{contact.data.name}</option>
              })}
            </Input>
            <Button type="submit">Add Follow Up</Button>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={interviewModal} toggle={() => setInterviewModal(!interviewModal)}>
        <ModalHeader toggle={() => setInterviewModal(!interviewModal)}>Add Interview</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddInterview}>
            <Input name="date" placeholder="date" />
            <Input name="time" placeholder="time" />
            <Input name="type" type="select">
              <option>Phone</option>
              <option>On Site</option>
              <option>Virtual</option>
            </Input>
            <Input name="notes" placeholder="notes" />
            <Button type="submit">Add Interview</Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default ApplicationDetail;