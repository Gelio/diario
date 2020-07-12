import React, { FunctionComponent } from 'react';

import { JournalEvent } from 'journal-events';
import { ClickableIcon } from 'components/clickable-icon';
import { MdDelete } from 'react-icons/md';

export interface EventItemProps {
  event: JournalEvent;
  onRemove: () => void;
}

export const EventItem: FunctionComponent<EventItemProps> = ({
  event,
  onRemove,
}) => (
  <li>
    {event.name}

    <ClickableIcon onClick={onRemove} title="Remove">
      <MdDelete />
    </ClickableIcon>
  </li>
);
