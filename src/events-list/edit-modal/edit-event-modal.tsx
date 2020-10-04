import { CenteredModal } from 'components/centered-modal';
import { JournalEvent } from 'journal-events';
import React, { FunctionComponent } from 'react';
import { EditEventFormProps, EditEventForm } from './edit-event-form';

export interface EditEventModalProps
  extends Omit<EditEventFormProps, 'editedEvent'> {
  editedEvent: JournalEvent | null;
}

export const EditEventModal: FunctionComponent<EditEventModalProps> = ({
  updateEvent,
  editedEvent,
  onClose,
}) => {
  return (
    <CenteredModal
      isOpen={!!editedEvent}
      onRequestClose={onClose}
      contentLabel={`Editing event ${editedEvent?.name}`}
    >
      <h2>Editing {editedEvent?.name}</h2>

      {editedEvent && (
        <EditEventForm
          onClose={onClose}
          updateEvent={updateEvent}
          editedEvent={editedEvent}
        />
      )}
    </CenteredModal>
  );
};
