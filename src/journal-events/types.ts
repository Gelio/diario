/**
 * Event stored in a journal
 */
export interface JournalEvent {
  id: string;
  name: string;
  timestamp: number;
}

export interface JournalEventsAPI {
  addEvent: (event: JournalEvent) => void;
  removeEvent: (eventId: JournalEvent['id']) => void;
  updateEvent: (updatedEvent: JournalEvent) => void;
}
