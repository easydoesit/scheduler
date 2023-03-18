import React, { useState } from "react";

import InterviewerList from "components/InterviewerList.jsx";
import Button from "components/Button.jsx";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [reminder, setReminder] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }

  const save = () => {
    if (student === "") {
      setReminder("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setReminder("Please select an interviewer");
      return;
    }
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => { event.preventDefault() }}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => {
              setStudent(event.target.value);
              setReminder("")
            }}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">
          {reminder}
          </section>
          </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={ setInterviewer }
          
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}

