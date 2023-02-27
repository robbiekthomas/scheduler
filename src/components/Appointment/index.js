import React from "react";

import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE";
const DELETE = "DELETE";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE"
const ERROR_DELETE = "ERROR_DELETE"

const Appointment = (props) => {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    // if (!name || !interviewer) {
    //   alert("Please input all information");
    //   return;
    // }
    transition(SAVE);
    props.bookInterview(props.id, interview, () => transition(SHOW), (error) => transition(ERROR_SAVE, true));
  }

  function onDelete() {
    transition(CONFIRM);
  }

  function onDeleteConfirm() {
    transition(DELETE, true);
    props.cancelInterview(props.id, () => transition(EMPTY), (error) => transition(ERROR_DELETE, true));
  }

  function onEdit() {
    transition(EDIT, true);
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
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVE && <Status message={"Saving"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={back}
          onConfirm={onDeleteConfirm}
        />
      )}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
          currentStudent={props.interview.student}
          currentInterviewer={props.interview.interviewer}
        />
      )}
      {mode === ERROR_DELETE && <Error message={'Could not cancel appointment'} onClose={back}/>}
      {mode === ERROR_SAVE && <Error message={'Could not save appointment'} onClose={back}/>}
    </article>
  );
};

export default Appointment;
