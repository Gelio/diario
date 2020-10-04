import { fireEvent, render, waitFor } from '@testing-library/react';
import { JournalEvent } from 'journal-events';
import React from 'react';
import { EditEventForm } from './edit-event-form';

describe('EditEventForm', () => {
  const initialEvent: JournalEvent = {
    id: '1234-dead-beef',
    name: 'Laundry',
    timestamp: new Date(2020, 6, 12).valueOf(),
  };

  it('should render a form with a name field', () => {
    const { getByLabelText, container } = render(
      <EditEventForm
        editedEvent={initialEvent}
        onClose={jest.fn()}
        updateEvent={jest.fn()}
      />
    );

    expect(container.querySelector('form')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
  });

  it('should allow updating the event name', async () => {
    const onClose = jest.fn();
    const updateEvent = jest.fn();
    const { getByLabelText, getByText } = render(
      <EditEventForm
        editedEvent={initialEvent}
        onClose={onClose}
        updateEvent={updateEvent}
      />
    );

    const nameField = getByLabelText('Name');
    const newEventName = 'Laundry with my cat';
    fireEvent.change(nameField, { target: { value: newEventName } });

    const saveButton = getByText('Save');
    fireEvent.click(saveButton);

    // Workaround, as submitting does not happen synchronously
    // https://github.com/formium/formik/issues/1554#issuecomment-496671231
    await waitFor(() => expect(onClose).toHaveBeenCalledTimes(1));
    expect(updateEvent).toHaveBeenCalledTimes(1);
    expect(updateEvent).toHaveBeenCalledWith(
      expect.objectContaining({ name: newEventName })
    );
  });
});
