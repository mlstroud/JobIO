import React from "react";
import Job from "./Job";
import { useFirestore } from "react-redux-firebase";
import { connect } from "react-redux";

function JobList(props) {

  const firestore = useFirestore();
  const { jobList } = props;

  function handleAddingJob(jobToAdd) {
    return firestore.collection("applications").add({
      title: jobToAdd.title,
      company: jobToAdd.company,
      location: jobToAdd.location,
      summary: jobToAdd.summary,
      stage: jobToAdd.stage,
      user: jobToAdd.user,
      appliedDate: firestore.FieldValue.serverTimestamp()
    });
  }

  return (
    jobList.map((job, index) => {
      return <Job
        key={index + job.title}
        addJobToFirestore={handleAddingJob}
        url={job.url}
        title={job.title}
        company={job.company}
        location={job.location}
        summary={job.summary}
        user={props.currentUser.email} />
    })
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(JobList);