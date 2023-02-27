import { useState } from "react";
import axios from "axios";
// import { actions } from "@storybook/addon-actions";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function updateSpots(updatedAppointments) {
    const day = state.days.find((day) => day.name === state.day);

    let spotsCounter = 0;
    for (const appointment of day.appointments) {
      if (updatedAppointments[appointment].interview === null) {
        spotsCounter++;
      }
    }
    const updatedDay = {
      ...day,
      spots: spotsCounter,
    };

    const dayIndex = day.id - 1;

    const updatedDays = [...state.days];
    updatedDays[dayIndex] = updatedDay;

    return updatedDays;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments),
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        setState({
          ...state,
          appointments,
          days: updateSpots(appointments),
        });
      });
  }

  return { state, setState, setDay, bookInterview, cancelInterview };
}
