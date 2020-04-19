import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
  useMemo,
} from 'react';
import { JournalEvent, JournalEventsAPI } from './types';
import { getComponentName } from 'utils/get-component-name';
import {
  saveEventsToLocalStorage,
  getEventsFromLocalStorage,
} from './local-storage';

const JournalEventsContext = createContext<JournalEvent[] | null>(null);
const JournalEventsAPIContext = createContext<JournalEventsAPI | null>(null);

export const JournalEventsProvider: FunctionComponent = ({ children }) => {
  const [events, setEvents] = useState(getEventsFromLocalStorage);

  const addEvent: JournalEventsAPI['addEvent'] = (event) => {
    setEvents((previousEvents) => {
      const updatedEvents = [...previousEvents, event];
      saveEventsToLocalStorage(updatedEvents);

      return updatedEvents;
    });
  };

  const journalEventsAPI: JournalEventsAPI = useMemo(
    () => ({
      addEvent,
    }),
    []
  );

  return (
    <JournalEventsContext.Provider value={events}>
      <JournalEventsAPIContext.Provider value={journalEventsAPI}>
        {children}
      </JournalEventsAPIContext.Provider>
    </JournalEventsContext.Provider>
  );
};

export const useJournalEvents = () => {
  const journalEvents = useContext(JournalEventsContext);

  if (!journalEvents) {
    throw new Error(
      `Journal Events context is not availble. Component is not a descendant of ${getComponentName(
        JournalEventsProvider
      )}`
    );
  }

  return journalEvents;
};

export const useJournalEventsAPI = () => {
  const journalEventsAPI = useContext(JournalEventsAPIContext);

  if (!journalEventsAPI) {
    throw new Error(
      `Journal Events API context is not availble. Component is not a descendant of ${getComponentName(
        JournalEventsProvider
      )}`
    );
  }

  return journalEventsAPI;
};
