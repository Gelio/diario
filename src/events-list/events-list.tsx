import React, { FunctionComponent, useMemo } from 'react';
import { useJournalEvents } from 'journal-events/context';
import { JournalEvent } from 'journal-events';
import { groupEventsByDate } from './group-events-by-date';

export const EventsList: FunctionComponent = () => {
  const events = useJournalEvents();
  const eventsGroupedByDate = useMemo(() => groupEventsByDate(events), [
    events,
  ]);
  const dates = useMemo(() => [...eventsGroupedByDate.keys()].sort(), [
    eventsGroupedByDate,
  ]);

  return (
    <>
      <h1>Journal Events</h1>

      {dates.length === 0 && (
        <p>
          No journal events have been logged. Add one using the bar at the top
        </p>
      )}

      {dates.length > 0 &&
        dates.map((date) => (
          <EventsForDate
            key={date}
            date={date}
            events={eventsGroupedByDate.get(date)!}
          />
        ))}
    </>
  );
};

const EventsForDate: FunctionComponent<{
  date: string;
  events: JournalEvent[];
}> = ({ date, events }) => (
  <>
    <h2>{date}</h2>

    <ul>
      {events.map((event) => (
        <EventItem event={event} key={event.id} />
      ))}
    </ul>
  </>
);

const EventItem: FunctionComponent<{ event: JournalEvent }> = ({ event }) => (
  <li>{event.name}</li>
);
