import React from 'react';
import { Layout } from 'layout';
import { JournalEventsProvider } from 'journal-events/context';

function App() {
  return (
    <JournalEventsProvider>
      <Layout>
        <div>Main content</div>
      </Layout>
    </JournalEventsProvider>
  );
}

export default App;
