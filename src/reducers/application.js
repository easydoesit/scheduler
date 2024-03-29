export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
// reducer brings in the original state and the action is an object
export default function reducer(state, action) {

  switch (action.type) {
    case SET_DAY:

      return {
        ...state,
        day: action.day
      }
    case SET_APPLICATION_DATA:

      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      }
    case SET_INTERVIEW:
      return {
        ...state,
        appointments: action.appointments,
        days: action.days
      }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

