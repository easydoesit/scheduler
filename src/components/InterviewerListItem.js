import React, { useState } from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  console.log(props);

  const [interviewer, setInterviewer] = useState();

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected":props.selected,
  })

  const formatName = () => {
    if (props.selected) {
    return props.name;
    }
  }


  return (
    <li id={interviewer} 
      className={interviewerClass} 
      onClick={() => props.setInterviewer(props.id)}
    >
      <img 
        className="interviewers__item-image" 
        src={props.avatar}
        alt={props.name}
      />
      {formatName()}
      </li>
  );

}