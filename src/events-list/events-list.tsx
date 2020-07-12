import React, { FunctionComponent, useMemo, useState } from 'react';
import { useJournalEvents, useJournalEventsAPI } from 'journal-events/context';
import { JournalEvent, JournalEventsAPI } from 'journal-events';
import { groupEventsByDate } from './group-events-by-date';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { ClickableIcon } from 'components/clickable-icon';
import { EventItem } from './event-item';

export const EventsList: FunctionComponent = () => {
  const events = useJournalEvents();
  const { removeEvent } = useJournalEventsAPI();
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
            removeEvent={removeEvent}
          />
        ))}
    </>
  );
};

const EventsForDate: FunctionComponent<{
  date: string;
  events: JournalEvent[];
  removeEvent: JournalEventsAPI['removeEvent'];
}> = ({ date, events, removeEvent }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapse = () => setCollapsed((collapsed) => !collapsed);

  return (
    <>
      <h2>
        <ClickableIcon
          onClick={toggleCollapse}
          title={collapsed ? 'Show more' : 'Hide details'}
        >
          {collapsed ? <MdExpandMore /> : <MdExpandLess />}
        </ClickableIcon>

        {date}
      </h2>

      {!collapsed && (
        <ul>
          {events.map((event) => (
            <EventItem
              event={event}
              key={event.id}
              onRemove={removeEvent.bind(null, event.id)}
            />
          ))}
        </ul>
      )}
    </>
  );
};