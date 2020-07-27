import React from "react";
import { Form, Button, Jumbotron, InputGroup, Input } from "reactstrap";
import { useFirestore } from "react-redux-firebase";
import { connect } from "react-redux";

function ManageApplication(props) {
  const { application } = props;
  const firestore = useFirestore();

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
      <Jumbotron>Test</Jumbotron>
      <Form onSubmit={formSubmissionHandler}>
        <Input name="title" value={application.title} />
        <Input name="company" value={application.company} />
        <Input name="location" value={application.location} />
        <Input name="stage" type="select">
          <option>Applied</option>
          <option>Phone Screen</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Denied</option>
        </Input>
        <Button type="submit">Update</Button>
      </Form>
    </React.Fragment>
  );
}

export default connect()(ManageApplication);