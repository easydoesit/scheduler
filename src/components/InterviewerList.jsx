import React from "react";
import InterviewerListItem from "./InterviewerListItem.jsx";
import PropTypes from 'prop-types';

import "components/InterviewerList.scss"

const InterviewerList = function(props) {
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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
}

export default InterviewerList;