import React from 'react';
import { Layout } from 'layout';
import { JournalEventsProvider } from 'journal-events/context';
import { EventsList } from 'events-list';

function App() {
  return (
    <JournalEventsProvider>
      <Layout>
        <EventsList />
      </Layout>
    </JournalEventsProvider>
  );
}

export default App;
