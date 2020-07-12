import { render } from 'test-utils/render';
import { EventItem } from './event-item';
import React from 'react';
import { JournalEvent } from 'journal-events';
import { fireEvent } from '@testing-library/react';

const sampleEvent: JournalEvent = {
  id: '123',
  name: 'Laundry',
  timestamp: new Date(2020, 6, 12).valueOf(),
};

describe('EventItem', () => {
  it('should render the event name', () => {
    const removeItem = jest.fn();

    const { getByText } = render(
      <EventItem event={sampleEvent} onRemove={removeItem} />
    );

    expect(getByText(sampleEvent.name)).toBeInTheDocument();
  });

  it('should call removeItem when clicking the delete icon', () => {
    const removeItem = jest.fn();

    const { getByTitle } = render(
      <EventItem event={sampleEvent} onRemove={removeItem} />
    );

    const icon = getByTitle('Remove');

    expect(icon).toBeInTheDocument();
    fireEvent.click(icon);

    expect(removeItem).toHaveBeenCalled();
  });
});
