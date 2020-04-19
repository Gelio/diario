import { JournalEvent } from 'journal-events';
import { groupEventsByDate } from './group-events-by-date';

const getTestEvents = (): JournalEvent[] => [
  {
    id: 'abc1',
    name: 'Event 1',
    timestamp: new Date(2020, 3, 19, 1).valueOf(),
  },
  {
    id: 'abc2',
    name: 'Event 2',
    timestamp: new Date(2020, 3, 20, 1).valueOf(),
  },
  {
    id: 'abc3',
    name: 'Event 3',
    timestamp: new Date(2020, 3, 19, 1).valueOf(),
  },
  {
    id: 'abc4',
    name: 'Earliest event',
    timestamp: new Date(2020, 3, 10, 1).valueOf(),
  },
  {
    id: 'abc5',
    name: 'Event 5',
    timestamp: new Date(2020, 3, 20, 2).valueOf(),
  },
];

describe('groupEventsByDate', () => {
  it('should format dates in keys', () => {
    const events = getTestEvents();
    const groupedEvents = groupEventsByDate(events);

    expect(groupedEvents.size).toBe(3);
    expect([...groupedEvents.keys()].sort()).toEqual([
      '2020-04-10',
      '2020-04-19',
      '2020-04-20',
    ]);
  });

  it('should group events into arrays', () => {
    const events = getTestEvents();
    const groupedEvents = groupEventsByDate(events);

    expect(groupedEvents.get('2020-04-10')).toHaveLength(1);
    expect(groupedEvents.get('2020-04-10')).toEqual([events[3]]);

    expect(groupedEvents.get('2020-04-19')).toHaveLength(2);
    expect(groupedEvents.get('2020-04-19')).toEqual([events[0], events[2]]);

    expect(groupedEvents.get('2020-04-20')).toHaveLength(2);
    expect(groupedEvents.get('2020-04-20')).toEqual([events[1], events[4]]);
  });
});
