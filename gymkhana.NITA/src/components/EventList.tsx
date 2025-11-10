import React, { useState } from 'react';
import EventCard from './event-card'; // Your existing EventCard component
import type { Event } from '~/types';

interface Props {
  events: Event[];
}

const EventList: React.FC<Props> = ({ events }) => {
  // Internal state to track visible events
  const [visibleEvents, setVisibleEvents] = useState<Event[]>(events);

  // Callback passed to EventCard so it can notify when a card should be removed on delete
  const handleDelete = (id: number) => {
    setVisibleEvents(evts => evts.filter(evt => evt.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {visibleEvents.map(event => (
        <EventCard key={event.id} event={event} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default EventList;
