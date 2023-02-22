export function getAppointmentsForDay(state, day) {
  const appArray = [];
  const answer = [];
  for (let nameDay of state.days ) {
    if (nameDay.name === day) {
      appArray.push(...nameDay.appointments)
    }
  }
  for (let app of appArray) {
        answer.push(state.appointments[app])
  }
  return answer;
}