import React from "react";
import "components/Appointments/styles.scss"
import Header from "./Header.jsx";
import Show from "./Show.jsx";
import Empty from "./Empty.jsx";
import useVisualMode from "hooks/useVisualMode.js";
import Form from "./Form.jsx";
import Status from "./Status.jsx";
import Confirm from "./Confirm.jsx";
import Error from "./Error.jsx";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const interview = { ...props.interview }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // name is the student name from the Form and interviewer is the ID of the Selected Inteviewer

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    }
    //must check that an interviewer has been selected otherwise errors
    if (interview.interviewer) {
      transition(SAVING);
      props.bookInterview(props.id, interview)
        .then(() => { transition(SHOW) })
        .catch((error) => {
          transition(ERROR_SAVE, true);
        });
    }
  }

  const onDelete = (id) => {
    transition(DELETE, true);
    props.deleteInterview(id)
      .then(() => { transition(EMPTY) })
      .catch((error) => {
        transition(ERROR_DELETE, true);
      })
  }

  const onConfirm = () => {
    transition(CONFIRM);
  }

  const onEdit = () => {
    transition(EDIT);
  }

  const onClose = () => {
    back();
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
            onEdit={() => onEdit()}
            onDelete={() => onConfirm()}
          //onDelete={() => onDelete(props.id)}
          />
        )
      }
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === SAVING && (
        <Status message={SAVING} />
      )}
      {mode === DELETE && (
        <Status message={DELETE} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={onDelete}
          id={props.id}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={interview.student}
          interviewer={interview.interviewer.id}
          onSave={save}
          onCancel={back}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message="Could not save appointment"
          onClose={onClose}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="Could not delete appointment"
          onClose={onClose}
        />
      )}


    </article>
  )
};