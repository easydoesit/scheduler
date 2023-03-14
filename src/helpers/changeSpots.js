export function changeSpots(state, apps) {
  //console.log(state)
  //console.log("apps", apps)
  // get the day we are on
  let thisDay = state.days.filter(day => day.name === state.day);
  thisDay = thisDay[0];
  //console.log('thisDay', thisDay);
  // check for null values and put into an array
  const nullCheck = thisDay.appointments.map(i => {
    let count = 0;
    if (apps[i].interview === null) {
      count = + 1;
    }
    return count;
  });
  //console.log("nullcheck", nullCheck)
  // count the spots available.
  let spots = 0;
  for (let i in nullCheck) {
    spots = spots + nullCheck[i]
  }
  thisDay.spots = spots;
  //console.log(thisDay);
  return thisDay;

}