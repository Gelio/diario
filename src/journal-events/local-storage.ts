import { JournalEvent } from './types';

const EVENTS_KEY = 'journalEvents';

export const saveEventsToLocalStorage = (events: JournalEvent[]) => {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
};

export const getEventsFromLocalStorage = (): JournalEvent[] => {
  const rawEvents = localStorage.getItem(EVENTS_KEY);

  if (!rawEvents) {
    return [];
  }

  return JSON.parse(rawEvents);
};
