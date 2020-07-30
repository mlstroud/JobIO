import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Spinner } from "reactstrap";
import Application from "./Application";
import { connect } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { useEffect } from "react";

function ApplicationList(props) {

  useFirestoreConnect([
    {
      collection: "applications",
    }
  ]);

  const firestore = useFirestore();

  const [applications, setApplications] = useState(null);

  let appData = [];

  useEffect(() => {
    firestore.collection("applications").where("user", "==", props.currentUser.email).get()
      .then((results) => {
        results.forEach((doc) => {
          appData.push({
            data: doc.data(),
            id: doc.id
          });
        });
        appData.sort((a, b) => { return b.data.appliedDate.toDate() - a.data.appliedDate.toDate() });
        setApplications(appData);
      }).catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <React.Fragment>
      {applications !== null && applications.map((app) => {
        return <Application
          onClickEdit={props.onClickEdit}
          onSelectApplication={props.onSelectApplication}
          title={app.data.title}
          company={app.data.company}
          location={app.data.location}
          summary={app.data.summary}
          stage={app.data.stage}
          appliedDate={app.data.appliedDate}
          id={app.id}
          key={app.id} />
      })}
    </React.Fragment>
  );

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ApplicationList);