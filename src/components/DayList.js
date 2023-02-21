import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  console.log(props.day);

  const listDays = props.days.map((dayItem) => 

  //console.log(day)
  <DayListItem 
    key={dayItem.id} 
    name={dayItem.name} 
    spots={dayItem.spots} 
    selected={props.day === dayItem.name} 
    setDay={props.setDay}/>
);

  return(
    <ul>{listDays}</ul>
  );
}