import React from "react";
import "components/Appointments/styles.scss"
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";

export default function Appointment(props) {
  const interview = { ...props.interview }
  console.log('interview', interview);
  const checkInterviewer = () => {
    if (interview.interviewer) {
      return <Show
        student={props.interview.student}
        key={props.interview.interviewer.id}
        id={props.interview.interviewer.id}
        name={props.interview.interviewer.name}
        avatar={props.interview.interviewer.avatar}
      />
    }
    return <Empty />
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {checkInterviewer()}
    </article>
  );
}