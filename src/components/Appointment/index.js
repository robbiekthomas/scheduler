import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    if (!name || !interviewer) {
      alert("Please input all information");
      return;
    }
    transition(SAVE);
    props.bookInterview(props.id, interview, () => transition(SHOW));
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onDeleteConfirm() {
    transition(DELETE);
    props.cancelInterview(props.id, () => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.int[props.interview.interviewer].name}
          onDelete={onDelete}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm message={"Are you sure you want to delete?"} onCancel={back} onConfirm={onDeleteConfirm}/>}
      {mode === DELETE && <Status message={"Deleting"} />}
    </article>
  );
};

export default Appointment;
