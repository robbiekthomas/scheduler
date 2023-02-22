export function getAppointmentsForDay(state, day) {
  const appArray = [];
  const answer = [];
  for (let nameDay of state.days) {
    if (nameDay.name === day) {
      appArray.push(...nameDay.appointments);
    }
  }
  for (let app of appArray) {
    answer.push(state.appointments[app]);
  }
  return answer;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const obj = {};
  obj.student = interview.student;
  obj.interviewer = state.interviewers[interview.interviewer];
  return obj;
}

export function getInterviewersForDay(state, day) {
  const appArray = [];
  const answer = [];
  for (let nameDay of state.days) {
    if (nameDay.name === day) {
      appArray.push(...nameDay.interviewers);
    }
  }
  for (let app of appArray) {
    answer.push(state.interviewers[app]);
  }
  return answer;
}
