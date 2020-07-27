import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Spinner } from "reactstrap";
import Application from "./Application";

function ApplicationList() {

  useFirestoreConnect([
    { collection: "applications" }
  ]);

  const applications = useSelector(state => state.firestore.ordered.applications);

  if (isLoaded(applications)) {
    return (
      <React.Fragment>
        {applications.map((app) => {
          return <Application
            title={app.title}
            company={app.company}
            location={app.location}
            summary={app.summary}
            stage={app.stage}
            appliedDate={app.appliedDate}
            id={app.id}
            key={app.id} />
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Spinner />
      </React.Fragment>
    );
  }
}

export default ApplicationList;