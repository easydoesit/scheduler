import { useReducer, useEffect } from "react";
import axios from 'axios';
import { changeSpots } from "helpers/changeSpots";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "../reducers/application";

export default function useApplicationData() {
  // this is the host machine

  const url = "ws://localhost:8001"

  // State object for the entire app
  const [state, dispatch] = useReducer(reducer, {
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
  const setDay = day => dispatch({ ...state, day, type: SET_DAY });

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

    // calculate the state of spots based on the day
    const day = changeSpots(state, appointments, id);
    const days = [
      ...state.days,
    ]
    days[day.id - 1] = day;

    //update the database and setState
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        dispatch({
          ...state,
          appointments,
          days,
          type: SET_INTERVIEW
        });
      });
  }

  //delete interview takes in the appointment id
  const deleteInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // calculate the state of spots based on the day
    const day = changeSpots(state, appointments, id);
    const days = [
      ...state.days,
    ]
    days[day.id - 1] = day;

    //update the database and set state
    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        //(study notes)  
        //this dispatches the things that need to change the state 
        //in this case the appointments object and days object
        dispatch({
          ...state,
          appointments,
          days,
          type: SET_INTERVIEW
        });
      })
  }

  // use a promise inside UseEffect to make a single call to the API
  // This is the initial render of the app before we modify the states
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {
      //(study notes)  
      //this dispatches the things that need to change the state
      //in this case everything from the api call.
      dispatch({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
        type: SET_APPLICATION_DATA
      });
    },);
  }, [])

  useEffect(() => {
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      webSocket.send("ping");
    }
    // once the message comes back from the server change it to a state that can update
    // the interview.
    webSocket.onmessage = (event) => {
      if (event.data !== 'pong') {
        // what if we return only returnObj
        // then
        const returnObj = JSON.parse(event.data);

        if (returnObj.type === SET_INTERVIEW) {
          const appointments = {
            ...state.appointments,
          }
          appointments[returnObj.id].interview = returnObj.interview;

          // calculate the state of spots based on the day
          const day = changeSpots(state, appointments, returnObj.id);

          const days = [
            ...state.days,
          ]
          days[day.id - 1] = day;


          dispatch({
            ...state,
            appointments: appointments, days,
            type: SET_INTERVIEW
          });
        }
      }
    }
    return function cleanup() {
      if (webSocket.readyState === 1) {
        webSocket.close();
      }
    }
  })

  return { state, setDay, bookInterview, deleteInterview };
}