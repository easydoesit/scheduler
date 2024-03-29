// changeSpots takes in the current state, all the appointments and the id of the selected appointment.
// returns thisDays object
export function changeSpots(state, apps, appointmentID) {

  // get the day we are on
  let thisDay = state.days.filter(day => day.appointments.find(appt => appt === appointmentID) === appointmentID);;
  thisDay = thisDay[0];

  // check for null values and put into an array
  const nullCheck = thisDay.appointments.map(i => {
    let count = 0;
    if (apps[i].interview === null) {
      count = + 1;
    }
    return count;
  });

  // count the spots available.
  let spots = 0;
  for (let i in nullCheck) {
    spots = spots + nullCheck[i]
  }

  thisDay.spots = spots;
  return thisDay;

}