import React from "react";
import InterviewerListItem from "./InterviewerListItem.jsx";

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const listInterviewers = props.interviewers.map((interviewerItem) =>
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === props.interviewer}
      setInterviewer={() => props.onChange(interviewerItem.id)}
    />
  )

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listInterviewers}</ul>
    </section>
  );
}

