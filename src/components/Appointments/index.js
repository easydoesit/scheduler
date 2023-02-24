import React from "react";
import "components/Appointments/styles.scss"
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";

export default function Appointment(props) {
  console.log("appointment: ", props);

  const interview = {...props.interview};
  
  console.log("interview", interview); 

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