import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Spinner } from "reactstrap";
import Application from "./Application";
import { connect } from "react-redux";
import { useFirestore } from "react-redux-firebase";

function ApplicationList(props) {

  useFirestoreConnect([
    {
      collection: "applications",
    }
  ]);

  const firestore = useFirestore();

  const [applications, setApplications] = useState(null);

  let appData = [];

  firestore.collection("applications").where("user", "==", props.currentUser.email).get()
    .then((results) => {
      results.forEach((doc) => {
        appData.push(doc.data());
      });

      setApplications(appData);
    }).catch((error) => {
      console.log(error.message);
    })

  //const applications = useSelector(state => state.firestore.ordered.applications);

  if (isLoaded(applications)) {
    return (
      <React.Fragment>
        {applications !== null && applications.map((app) => {
          return <Application
            onClickEdit={props.onClickEdit}
            onSelectApplication={props.onSelectApplication}
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ApplicationList);