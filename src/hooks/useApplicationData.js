import { useState, useEffect } from "react";
import axios from 'axios';
export default function useApplicationData() {
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

  return { state, setDay, bookInterview, deleteInterview };
}