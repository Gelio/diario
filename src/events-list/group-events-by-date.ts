import { JournalEvent } from 'journal-events';

export const groupEventsByDate = (events: JournalEvent[]) => {
  const buckets = new Map<string, JournalEvent[]>();

  events.forEach((event) => {
    const date = formatDate(event.timestamp);

    if (!buckets.has(date)) {
      buckets.set(date, []);
    }

    const bucket = buckets.get(date)!;
    bucket.push(event);
  });

  return buckets;
};

function formatDate(timestamp: number) {
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${padToTwoZeros(
    date.getMonth() + 1
  )}-${padToTwoZeros(date.getDate())}`;
}

const padToTwoZeros = (value: number) => value.toString().padStart(2, '0');
