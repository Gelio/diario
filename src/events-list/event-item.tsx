import React, { FunctionComponent } from 'react';

import { JournalEvent } from 'journal-events';
import { ClickableIcon } from 'components/clickable-icon';
import { MdDelete, MdEdit } from 'react-icons/md';

export interface EventItemProps {
  event: JournalEvent;
  onRemove: () => void;
  onEdit: () => void;
}

export const EventItem: FunctionComponent<EventItemProps> = ({
  event,
  onRemove,
  onEdit,
}) => (
  <li>
    {event.name}

    <ClickableIcon onClick={onEdit} title="Edit">
      <MdEdit />
    </ClickableIcon>
    <ClickableIcon onClick={onRemove} title="Remove">
      <MdDelete />
    </ClickableIcon>
  </li>
);
