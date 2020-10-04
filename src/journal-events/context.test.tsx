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

const useJournalEventsWithAPI = () => {
  const events = useJournalEvents();
  const api = useJournalEventsAPI();

  return { events, api };
};

const sampleEvent: JournalEvent = {
  id: 'laundry',
  name: 'Laundry',
  timestamp: 1587313239873,
};

describe('journal events context', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an empty list of events initially', () => {
    const { result } = renderHookWithJournalEvents(useJournalEvents);

    expect(result.current).toEqual([]);
  });

  it('should return added events', () => {
    const { result } = renderHookWithJournalEvents(useJournalEventsWithAPI);

    act(() => {
      result.current.api.addEvent(sampleEvent);
    });

    expect(result.current.events).toEqual([sampleEvent]);
  });

  it('should remove events', () => {
    const { result } = renderHookWithJournalEvents(useJournalEventsWithAPI);

    act(() => {
      result.current.api.addEvent({
        id: 'test2',
        name: 'Test2',
        timestamp: 1234,
      });
      result.current.api.addEvent(sampleEvent);
      result.current.api.addEvent({
        id: 'test',
        name: 'Test',
        timestamp: 123,
      });

      result.current.api.removeEvent('test');
      result.current.api.removeEvent('test2');
    });

    expect(result.current.events).toEqual([sampleEvent]);
  });

  it('should persist the events between reloads', () => {
    const {
      result: {
        current: { addEvent },
      },
    } = renderHookWithJournalEvents(useJournalEventsAPI);

    act(() => {
      addEvent(sampleEvent);
    });

    const { result } = renderHookWithJournalEvents(useJournalEvents);
    expect(result.current).toEqual([sampleEvent]);
  });

  it('should update existing events', () => {
    const {
      result: {
        current: { addEvent, updateEvent },
      },
    } = renderHookWithJournalEvents(useJournalEventsAPI);

    const updatedEvent = {
      ...sampleEvent,
      name: 'I have been updated',
    };

    act(() => {
      addEvent(sampleEvent);
      updateEvent(updatedEvent);
    });

    const { result } = renderHookWithJournalEvents(useJournalEvents);

    expect(result.current).toContainEqual(updatedEvent);
  });
});
