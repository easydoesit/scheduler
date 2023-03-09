import React, { useState, useEffect } from "react";
import axios from 'axios';
import DayList from "./DayList";
import Appointment from "./Appointments";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";

import "components/Application.scss";

export default function Application(props) {
  // this is the host machine
  const host = "http://localhost:8001";

  // State object for the entire app
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      "1": {
        id: 1,
        time: "12pm",
        interview: null
      }
    },
    interviewers: {}
  });

  // This function will set the day in state
  const setDay = day => setState({ ...state, day });
  //book interview takes in the appointment id and the interview object.
  const bookInterview = (id, interview) => {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`${host}/api/appointments/${id}`, { interview })
      .then((response) => {
        setState({
          ...state,
          appointments
        });
      });
  }

  const deleteInterview = (id) => {
    console.log("delete.interview: ", id);
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("hello world", appointments);
    console.log("abcd", appointment);

    return axios.delete(`${host}/api/appointments/${id}`)
      .then((response) => {
        setState({
          ...state,
          appointments
        });
      })
  }

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
  // use a promise inside UseEffect to make a single call to the API
  // This is the initial render of the app before we modify the states
  useEffect(() => {
    Promise.all([
      axios.get(`${host}/api/days`),
      axios.get(`${host}/api/appointments`),
      axios.get(`${host}/api/interviewers`)
    ]).then((all) => {
      console.log('all: ', all);
      setState((prev) => {
        return { ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }
      });
    },);
  }, [])

  console.log("state", state);
  console.log("state.interviewers", state.interviewers);
  console.log('schedule: ', schedule)

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
        {/* map all the appointments so they can be read by the appoinment component*/}
        {/* {dailyAppointments.map((appointment) =>
          < Appointment
            key={appointment.id}
            {...appointment}
          />
        )} */}
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
