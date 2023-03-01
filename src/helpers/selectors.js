// returns an array of appointments given a state object and a day "string"
export function getAppointmentsForDay(state, day) {
  console.log(day);
  const slots = [];

  if (state.days.length) {
  
    const filteredDays = state.days.filter(days => days.name === day);
    let appointmentsArr;
    if (filteredDays.length) {
      appointmentsArr = filteredDays[0].appointments;
      appointmentsArr.map((appt) => {
      slots.push(state.appointments[appt]);
    })
  }
  }
  return slots;
}