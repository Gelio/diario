import React, { FunctionComponent } from 'react';

import { JournalEvent } from 'journal-events';

export interface EventItemProps {
  event: JournalEvent;
}

export const EventItem: FunctionComponent<EventItemProps> = ({ event }) => (
  <li>{event.name}</li>
);
