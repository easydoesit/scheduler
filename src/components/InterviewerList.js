import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  console.log("interviewers props: ", props);

  const listInterviewers = props.interviewers.map((interviewerItem) => 
  <InterviewerListItem
    key={interviewerItem.id}
    name={interviewerItem.name}
    avatar={interviewerItem.avatar}
  />
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}

