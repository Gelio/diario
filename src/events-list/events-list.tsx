import React, { FunctionComponent } from 'react';
import { useJournalEvents } from 'journal-events/context';
import { JournalEvent } from 'journal-events';

export const EventsList: FunctionComponent = () => {
  const events = useJournalEvents();

  return (
    <>
      <h1>Journal Events</h1>

      <ul>
        {events.map((event) => (
          <EventItem event={event} key={event.id} />
        ))}
      </ul>
    </>
  );
};

const EventItem: FunctionComponent<{ event: JournalEvent }> = ({ event }) => (
  <li>{event.name}</li>
);
