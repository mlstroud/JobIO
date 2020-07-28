import React from "react";
import Interview from "./Interview";

function InterviewList(props) {
  const { interviews } = props;

  return (
    <React.Fragment>
      {interviews !== null && interviews.map((interview) => {
        return <Interview
          key={interview.id}
          id={interview.id}
          date={interview.data.date}
          time={interview.data.time}
          type={interview.data.type}
          notes={interview.data.notes}
        />
      })}
    </React.Fragment>
  );
}

export default InterviewList;