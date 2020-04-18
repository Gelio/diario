/**
 * Event stored in a journal
 */
export interface JournalEvent {
  name: string;
  date: Date;
}

export interface JournalEventsAPI {
  addEvent: (event: JournalEvent) => void;
}
