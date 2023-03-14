import React from "react";
import DayList from "./DayList";
import Appointment from "./Appointments";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

import "components/Application.scss";

export default function Application(props) {
  // bring in the hook to manage state.
  const {
    state,
    setDay,
    bookInterview,
    deleteInterview
  } = useApplicationData();

  // call imported helper function
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const interviewers = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}
        interviewers={interviewers}

      />
    )
  });


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}