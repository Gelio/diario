import {
  useJournalEvents,
  JournalEventsProvider,
  useJournalEventsAPI,
} from './context';
import {
  renderHook,
  RenderHookOptions,
  act,
} from '@testing-library/react-hooks';
import { JournalEvent } from './types';

const renderHookWithJournalEvents = <P, R>(
  callback: (props: P) => R,
  options?: RenderHookOptions<P>
) =>
  renderHook(callback, {
    wrapper: JournalEventsProvider,
    ...options,
  });

describe('journal events context', () => {
  it('should return an empty list of events initially', () => {
    const { result } = renderHookWithJournalEvents(useJournalEvents);

    expect(result.current).toEqual([]);
  });

  it('should persist the events between reloads', () => {
    const {
      result: {
        current: { addEvent },
      },
    } = renderHookWithJournalEvents(useJournalEventsAPI);

    const event: JournalEvent = {
      id: 'test',
      name: 'Some event',
      timestamp: 1587313239873,
    };

    act(() => {
      addEvent(event);
    });

    const { result } = renderHookWithJournalEvents(useJournalEvents);
    expect(result.current).toEqual([event]);
  });
});
