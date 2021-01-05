import React, { FunctionComponent, useMemo, useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import { useJournalEvents, useJournalEventsAPI } from 'journal-events/context';
import { JournalEvent, JournalEventsAPI } from 'journal-events';
import { groupEventsByDate } from './group-events-by-date';
import { ClickableIcon } from 'components/clickable-icon';
import { EventItem } from './event-item';
import { EditEventModal } from './edit-modal';
import styles from './events-list.module.css';
import { QuickAddBar } from 'components/quick-add-bar';

export const EventsList: FunctionComponent = () => {
  const events = useJournalEvents();
  const { removeEvent, updateEvent } = useJournalEventsAPI();
  const eventsGroupedByDate = useMemo(() => groupEventsByDate(events), [
    events,
  ]);
  const dates = useMemo(() => [...eventsGroupedByDate.keys()].sort(), [
    eventsGroupedByDate,
  ]);
  const [editedEvent, setEditedEvent] = useState<JournalEvent | null>(null);

  return (
    <div className={styles.container}>
      <div className="centered-content">
        <span className={styles['section-title']}>Journal Events</span>

        <QuickAddBar />

        {dates.length === 0 && (
          <p>
            No journal events have been logged. Add one using the bar at the top
          </p>
        )}

        <EditEventModal
          editedEvent={editedEvent}
          onClose={() => setEditedEvent(null)}
          updateEvent={updateEvent}
        />

        {dates.length > 0 &&
          dates.map((date) => (
            <EventsForDate
              key={date}
              date={date}
              events={eventsGroupedByDate.get(date)!}
              removeEvent={removeEvent}
              onEdit={setEditedEvent}
            />
          ))}
      </div>
    </div>
  );
};

const EventsForDate: FunctionComponent<{
  date: string;
  events: JournalEvent[];
  removeEvent: JournalEventsAPI['removeEvent'];
  onEdit: (event: JournalEvent) => void;
}> = ({ date, events, removeEvent, onEdit }) => {
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
              onEdit={onEdit.bind(null, event)}
            />
          ))}
        </ul>
      )}
    </>
  );
};
