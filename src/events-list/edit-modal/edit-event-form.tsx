import { ErrorMessage, Field, Form, Formik } from 'formik';
import { JournalEvent, JournalEventsAPI } from 'journal-events';
import React, { FunctionComponent } from 'react';

export interface EditEventFormProps {
  editedEvent: JournalEvent;
  onClose: () => void;
  updateEvent: JournalEventsAPI['updateEvent'];
}

interface EditFormData {
  name: string;
}

const validateEditEventFormData = ({ name }: EditFormData) => {
  if (name.length === 0) {
    return { name: 'Required' };
  }

  return {};
};

export const EditEventForm: FunctionComponent<EditEventFormProps> = ({
  editedEvent,
  updateEvent,
  onClose,
}) => {
  return (
    <Formik
      initialValues={{ name: editedEvent.name }}
      validate={validateEditEventFormData}
      onSubmit={({ name }) => {
        updateEvent({
          ...editedEvent,
          name,
        });
        onClose();
      }}
    >
      {({ isValid }) => (
        <Form>
          <label>
            Name
            <Field name="name" />
          </label>
          <ErrorMessage name="name" component="div" />

          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={!isValid}>
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
