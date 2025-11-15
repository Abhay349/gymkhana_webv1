'use client';

import React, { useEffect, useState } from 'react';
import EventList from '~/components/EventList';
import ComingSoonScreen from '~/screens/coming-soon';
import type { Event } from '~/types';

// Inject spinner CSS globally
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .spinnerWrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
      width: 100%;
    }

    .spinner {
      width: 42px;
      height: 42px;
      border: 4px solid #e2e8f0;
      border-top-color: #1E90FF;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `;
  document.head.appendChild(styleTag);
}

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://gymkhana-web.onrender.com/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setLoading(false);
      });
  }, []);

  // 🔵 Loading spinner
  if (loading)
    return (
      <div className="spinnerWrapper">
        <div className="spinner"></div>
      </div>
    );

  // No events → Coming Soon UI
  if (events.length === 0) return <ComingSoonScreen />;

  // Show events
  return <EventList events={events} />;
};

export default EventsPage;
