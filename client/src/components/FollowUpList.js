import React from "react";
import FollowUp from "./FollowUp";

function FollowUpList(props) {

  const { followups } = props;

  return (
    <React.Fragment>
      {followups !== null && followups.map((followUp) => {
        return <FollowUp
          key={followUp.id}
          id={followUp.id}
          date={followUp.data.date}
          name={followUp.data.contactName}
          email={followUp.data.contactEmail}
          phone={followUp.data.contactPhone}
        />
      })}
    </React.Fragment>
  );
}

export default FollowUpList;