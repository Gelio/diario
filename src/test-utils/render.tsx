import { render as rtlRender, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { JournalEventsProvider } from 'journal-events/context';

export const render = (ui: ReactElement, options?: RenderOptions) => {
  const wrappedUi = <JournalEventsProvider>{ui}</JournalEventsProvider>;

  return rtlRender(wrappedUi, options);
};
