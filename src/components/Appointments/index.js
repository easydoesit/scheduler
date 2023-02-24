import React from "react";
import "components/Appointments/styles.scss"
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";

export default function Appointment(props) {
  const interview = {...props.interview};
  
  const checkInterviewer = () => {
    if (interview.interviewer) {
      return <Show  />
    }
    return <Empty />
  }


  return(
    <article className="appointment">
      <Header time={props.time} />
      {checkInterviewer()}
    </article>
  );
}