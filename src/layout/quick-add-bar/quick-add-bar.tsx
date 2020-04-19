import React, { FunctionComponent, useState, FormEventHandler } from 'react';

import styles from './quick-add-bar.module.css';
import { useJournalEventsAPI } from 'journal-events/context';

export const QuickAddBar: FunctionComponent = () => {
  const [eventName, setEventName] = useState('');
  const eventsAPI = useJournalEventsAPI();

  const addNewEvent: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    eventsAPI.addEvent({
      name: eventName,
      timestamp: Date.now(),
    });
    setEventName('');
  };

  return (
    <div className={styles['quick-add-bar']}>
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
