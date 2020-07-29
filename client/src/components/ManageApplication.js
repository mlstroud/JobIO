import React from "react";
import { Container, Form, Label, Button, Jumbotron, InputGroup, Input } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import styled from "styled-components";

const ManageTron = styled(Jumbotron)`
  margin-top: 200px;
  box-shadow: 1px 2px 2px black;
`;

const AppLabel = styled(Label)`
  font-weight: bold;
`;

const AppButton = styled(Button)`
  margin: 5px;
`;

function ManageApplication(props) {
  const { application } = props;
  const firestore = useFirestore();

  function goBackToApp() {
    props.dispatch({ type: "NO_MANAGE" });
  }

  function formSubmissionHandler(event) {
    event.preventDefault();
    props.onEditApplication();
    const propsToUpdate = {
      title: event.target.title.value,
      company: event.target.company.value,
      location: event.target.location.value,
      stage: event.target.stage.value
    };

    let action = {
      type: "SELECT_APPLICATION",
      application: {
        title: event.target.title.value,
        company: event.target.company.value,
        location: event.target.location.value,
        stage: event.target.stage.value,
        appliedDate: application.appliedDate,
        id: application.id
      }
    }

    props.dispatch(action);
    return firestore.update({ collection: "applications", doc: application.id }, propsToUpdate);
  }

  console.log("Manage");
  console.log(props);
  return (
    <React.Fragment>
      <Container>
        <h1>Edit Application</h1>
        <ManageTron>
          <Form onSubmit={formSubmissionHandler}>
            <AppLabel forr="title">Title</AppLabel>
            <Input name="title" value={application.title} />
            <AppLabel forr="company">Company</AppLabel>
            <Input name="company" value={application.company} />
            <AppLabel forr="location">Location</AppLabel>
            <Input name="location" value={application.location} />
            <AppLabel forr="stage">Stage</AppLabel>
            <Input name="stage" type="select">
              <option>Applied</option>
              <option>Phone Screen</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Denied</option>
            </Input>
            <AppButton type="submit" color="primary">Save</AppButton>
            <AppButton onClick={() => goBackToApp()} color="warning">Go Back</AppButton>
          </Form>
        </ManageTron>
      </Container>
    </React.Fragment>
  );
}

export default connect()(ManageApplication);