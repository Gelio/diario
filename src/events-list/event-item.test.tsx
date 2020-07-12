import { render } from 'test-utils/render';
import { EventItem } from './event-item';
import React from 'react';
import { JournalEvent } from 'journal-events';

describe('EventItem', () => {
  it('should render the event name', () => {
    const event: JournalEvent = {
      id: '123',
      name: 'Laundry',
      timestamp: new Date(2020, 6, 12).valueOf(),
    };

    const { getByText } = render(<EventItem event={event} />);

    expect(getByText(event.name)).toBeInTheDocument();
  });
});
