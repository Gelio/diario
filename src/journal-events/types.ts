/**
 * Event stored in a journal
 */
export interface JournalEvent {
  name: string;
  timestamp: number;
}

export interface JournalEventsAPI {
  addEvent: (event: JournalEvent) => void;
}
