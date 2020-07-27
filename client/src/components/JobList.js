import React from "react";
import Job from "./Job";

function JobList(props) {

  const { jobList } = props;

  return (
    jobList.map((job, index) => {
      return <Job
        key={index + job.title}
        url={job.url}
        title={job.title}
        company={job.company}
        location={job.location}
        summary={job.summary} />
    })
  );
}

export default JobList;