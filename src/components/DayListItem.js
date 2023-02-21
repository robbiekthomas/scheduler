import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots,
  });

  const formatSpots = (spots) => {
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }
    if (spots === 1) {
      return <h3 className="text--light">{spots} spot remaining</h3>
    }
    return <h3 className="text--light">{spots} spots remaining</h3>
  }

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
    </li>
  );
}
