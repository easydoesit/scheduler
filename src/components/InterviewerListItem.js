import React, { useState } from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {
  console.log(props);

  const [selected, setSelected] = useState();

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected":props.selected,
  })

  const formatName = () => {
    if (props.selected) {
    return props.name;
    }
  }


  return (
    <li className={interviewerClass} onClick={() => setSelected(props.id)}>
      <img 
        className="interviewers__item-image" 
        src={props.avatar}
        alt={props.name}
      />
      {formatName()}
      </li>
  );

}