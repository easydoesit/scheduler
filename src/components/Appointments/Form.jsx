import React from "react";

import InterviewerList from "components/InterviewerList.jsx";
import Button from "components/Button.jsx";

export default function Form(props) {
  console.log(props);
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter student name"
            value={props.student}
          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={props.interviewer}
        //setInterviewer={() => props.onChange(props.id)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave(props.student, props.interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}

