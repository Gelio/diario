import React, { FunctionComponent, useState, FormEventHandler } from "react";

import styles from "./quick-add-bar.module.css";

export const QuickAddBar: FunctionComponent = (props) => {
  const [eventName, setEventName] = useState("");

  const addNewEvent: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    console.log("New event", eventName);
    setEventName("");
  };

  return (
    <div className={styles["quick-add-bar"]}>
      <form onSubmit={addNewEvent}>
        <input
          type="text"
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
          placeholder="Event name"
        />

        <button type="submit" disabled={eventName.length === 0}>
          Add
        </button>
      </form>
    </div>
  );
};