import React from "react";
import "components/Appointments/styles.scss"
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form.jsx";


export default function Appointment(props) {
  console.log("Appointment props", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const interview = { ...props.interview }
  console.log('interview', interview);

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // name is the student name from the Form and interviewer is the ID of the Selected Inteviewer

  // const save = (name, interviewer) => {
  //   const interview = {
  //     student: name,
  //     interviewer,
  //   };
  //   //transition(SAVE);
  //   props.bookInterview(props.id, interview)
  //     .then(() => {
  //       transition(SHOW);
  //       // console.log("useVisualMode index state is ", props.days[id]);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const save = (name, interviewer) => {
    console.log("WTF", interviewer);
    const interview = {
      student: name,
      interviewer
    }
    props.bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch((error) => console.log(error));
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {/*checkInterviewer()*/}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {
        mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            key={interview.interviewer.id}
            id={interview.interviewer.id}
            name={interview.interviewer.name}
            onEdit={() => console.log("Clicked On Edit")}
            onDelete={() => console.log("Clicked On Delete")}
          />
        )
      }
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
    </article>
  )
};