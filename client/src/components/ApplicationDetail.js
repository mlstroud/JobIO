import React from "react";
import ContactList from "./ContactList";
import FollowUpList from "./FollowUpList";
import InterviewList from "./InterviewList";
import { Container, Jumbotron, Button } from "reactstrap";
import { Form, Input } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { useState, useEffect } from "react";
import { Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Card, Row, Col } from "reactstrap";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AddIcon from "@material-ui/icons/AddBox";
import styled from "styled-components";

const AppTron = styled(Jumbotron)`
  margin-top: 100px;
  box-shadow: 1px 2px 2px black;
`;

const AppButton = styled(Button)`
  margin: 5px;
  box-shadow: 1px 1px 1px black;
`;

const CompanyInfo = styled.div`
  float: left;
  width: 75%;
`;

const NewIcon = styled(AddIcon)`
  cursor: pointer;
`;

const ModalLabel = styled(Label)`
  font-weight: bold;
`;

const EditInfo = styled.div`
  float: right;
`;

const AppStepper = styled(Stepper)`
  background-color: #e9ecef !important;
`;

const AppStep = styled(Step)`

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

  let stages = {
    "Applied": 1,
    "Phone Screen": 2,
    "Interview": 3,
    "Offer": 4
  }

  return (
    <React.Fragment>
      <Container>
        <AppTron>
          {application.stage !== "Denied" &&
            <AppStepper activeStep={stages[application.stage]}>
              <AppStep key={1}>
                <StepLabel>Applied</StepLabel>
              </AppStep>
              <AppStep key={2}>
                <StepLabel>Phone Screen</StepLabel>
              </AppStep>
              <AppStep key={3}>
                <StepLabel>Interview</StepLabel>
              </AppStep>
              <AppStep key={4}>
                <StepLabel>Offer</StepLabel>
              </AppStep>
            </AppStepper>}
          {application.stage === "Denied" &&
            <h4><font color="red">This application has been denied.</font></h4>
          }
          <CompanyInfo>
            <h3>{application.title}</h3>
            <h4>{application.company} - {application.location}</h4>
            <p>Applied: {application.appliedDate.toDate().toString()}</p>
            <h4>Summary</h4>
            <p>{application.summary}</p>
          </CompanyInfo>
          <EditInfo>
            <AppButton onClick={() => onClickingEdit()} color="warning">Edit</AppButton>
            <AppButton onClick={() => onClickingDelete(application.id)} color="danger">Delete</AppButton>
          </EditInfo>
          <div style={{ "clear": "both" }}></div>
        </AppTron>
        <Row>
          <Col className="col-md-4">
            <h4>Interviews <NewIcon onClick={() => setInterviewModal(!interviewModal)} /></h4>
            <InterviewList interviews={interviews} appId={application.id} />
          </Col>
          <Col className="col-md-4">
            <h4>Follow Ups <NewIcon onClick={() => setFollowUpsModal(!followUpsModal)} /></h4>
            <FollowUpList followups={followUps} appId={application.id} />
          </Col>
          <Col className="col-md-4">
            <h4>Contacts <NewIcon onClick={() => setContactModal(!contactModal)} /></h4>
            <ContactList contacts={contacts} appId={application.id} />
          </Col>
        </Row>
      </Container>

      <Modal isOpen={contactModal} toggle={() => setContactModal(!contactModal)}>
        <ModalHeader toggle={() => setContactModal(!contactModal)}>Add Contact</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddContact}>
            <ModalLabel for="name">Name</ModalLabel>
            <Input name="name" placeholder="name" />
            <ModalLabel for="email">Email</ModalLabel>
            <Input name="email" placeholder="email" />
            <ModalLabel for="phone">Phone</ModalLabel>
            <Input name="phone" placeholder="phone" />
            <hr />
            <AppButton type="submit" color="primary">Add Contact</AppButton>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={followUpsModal} toggle={() => setFollowUpsModal(!followUpsModal)}>
        <ModalHeader toggle={() => setFollowUpsModal(!followUpsModal)}>Add Follow Up</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddFollowUp}>
            <ModalLabel for="date">Date</ModalLabel>
            <Input name="date" placeholder="date" />
            <ModalLabel for="contact">Contact</ModalLabel>
            <Input name="contact" type="select">
              {contacts !== null && contacts.map((contact) => {
                return <option value={contact.id} key={contact.id}>{contact.data.name}</option>
              })}
            </Input>
            <hr />
            <AppButton type="submit" color="primary">Add Follow Up</AppButton>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={interviewModal} toggle={() => setInterviewModal(!interviewModal)}>
        <ModalHeader toggle={() => setInterviewModal(!interviewModal)}>Add Interview</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAddInterview}>
            <ModalLabel for="date">Date</ModalLabel>
            <Input name="date" placeholder="date" />
            <ModalLabel for="time">Time</ModalLabel>
            <Input name="time" placeholder="time" />
            <ModalLabel for="type">Type</ModalLabel>
            <Input name="type" type="select">
              <option>Phone</option>
              <option>On Site</option>
              <option>Virtual</option>
            </Input>
            <ModalLabel for="notes">Notes</ModalLabel>
            <Input name="notes" placeholder="notes" />
            <hr />
            <AppButton type="submit" color="primary">Add Interview</AppButton>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default ApplicationDetail;