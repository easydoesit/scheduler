import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList(props) {

  const listDays = props.days.map((dayItem) =>
    <DayListItem
      key={dayItem.id}
      name={dayItem.name}
      spots={dayItem.spots}
      selected={props.value === dayItem.name}
      setDay={props.setDay} 
    />
  );

  return (
    <ul>{listDays}</ul>
  );
}