// returns an array of appointments given a state object and a day "string"
export function getAppointmentsForDay(state, day) {
  const slots = [];

  if (state.days.length) {

    const filteredDays = state.days.filter(days => days.name === day);
    let appointmentsArr;

    if (filteredDays.length) {
      appointmentsArr = filteredDays[0].appointments;

      appointmentsArr.map((appt) => {
        slots.push(state.appointments[appt]);
        return slots;
      })

    }
  }

  return slots;
}

export function getInterviewersForDay(state, day) {
  const slots = [];

  if (state.days.length) {

    const filteredDays = state.days.filter(days => days.name === day);
    let appointmentsArr;
    if (filteredDays.length) {
      appointmentsArr = filteredDays[0].interviewers;
      appointmentsArr.map((appt) => {
        slots.push(state.interviewers[appt]);
        return slots;
      })

    }
  }

  return slots;
}

// returns the interview object from the state if given an interview object.
export function getInterview(state, interview) {

  if (!interview || Object.keys(interview).length === 0) {
    return null;
  }

  const interviewerNum = interview.interviewer;

  const interviewDetails = {
    student: interview.student,
    interviewer: state.interviewers[interviewerNum]
  };

  return interviewDetails;

}
