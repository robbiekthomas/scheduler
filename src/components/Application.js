import React, { useEffect } from "react";
import axios from "axios";

import DayList from "./DayList";
import Appointment from "./Appointment";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  const { state, setState, setDay, bookInterview, cancelInterview } =
    useApplicationData();

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, [setState]);

  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointmentList = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        int={state.interviewers}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
