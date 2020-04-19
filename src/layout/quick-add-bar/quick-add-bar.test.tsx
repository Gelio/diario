import React from 'react';
import { render, fireEvent, RenderResult } from '@testing-library/react';
import { QuickAddBar } from './quick-add-bar';
import { JournalEventsProvider } from 'journal-events/context';

describe('QuickAddBar', () => {
  let renderResult: RenderResult;

  beforeEach(() => {
    renderResult = render(
      <JournalEventsProvider>
        <QuickAddBar />
      </JournalEventsProvider>
    );
  });

  it('should clear the input after clicking Add', () => {
    const { getByText, getByPlaceholderText } = renderResult;

    const eventNameInput = getByPlaceholderText(
      'Event name'
    ) as HTMLInputElement;
    expect(eventNameInput).toBeInTheDocument();
    expect(eventNameInput.value).toBe('');

    const addButton = getByText('Add');
    expect(addButton).toBeInTheDocument();

    fireEvent.change(eventNameInput, { target: { value: 'Review proposal' } });

    expect(eventNameInput.value).toBe('Review proposal');
    fireEvent.click(addButton);
    expect(eventNameInput.value).toBe('');
  });

  it('should have a disabled button when no text was entered', () => {
    const { getByText, getByPlaceholderText } = renderResult;

    const eventNameInput = getByPlaceholderText(
      'Event name'
    ) as HTMLInputElement;
    expect(eventNameInput.value).toBe('');

    const addButton = getByText('Add') as HTMLButtonElement;
    expect(addButton.disabled).toBeTruthy();
  });
});
