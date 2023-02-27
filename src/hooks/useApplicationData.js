import { useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });


  function bookInterview(id, interview, callback, errorCallback) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({
          ...state,
          appointments,
        });
      })
      .then(callback)
      .catch(errorCallback);
  }
  
  function cancelInterview(id, callback, errorCallback) {
    axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(callback)
      .catch(errorCallback);
  }

  

  return { state, setState, setDay, bookInterview, cancelInterview };
}
