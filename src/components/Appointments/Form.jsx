import React, { useState } from "react";

import InterviewerList from "components/InterviewerList.jsx";
import Button from "components/Button.jsx";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
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
            }}
            data-testid="student-name-input"
          />
          {student === "" && (   
          <div className="warning">
            Student name cannot be blank</div>)}
          </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          onChange={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={student && (() => props.onSave(student, interviewer))}>Save</Button>
        </section>
      </section>
    </main>
  );
}

