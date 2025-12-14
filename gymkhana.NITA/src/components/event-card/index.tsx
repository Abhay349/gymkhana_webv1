'use client';

import React, { useState } from "react";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import type { Event } from "~/types";

interface Props {
  event: Event;
  onDelete: (id: number) => void;
}

function formatDisplayDateRange(start?: string, end?: string) {
  if (!start || !end) return "";

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const opts: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    return `${startDate.toLocaleString(undefined, opts)} — ${endDate.toLocaleString(
      undefined,
      opts
    )}`;
  } catch {
    return "";
  }
}

const EventCard = ({ event, onDelete }: Props) => {
  const [showAuth, setShowAuth] = useState(false);
  const [auth, setAuth] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = () => setShowAuth(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async () => {
    if (!auth.username || !auth.password) {
      alert("Please enter username and password");
      return;
    }

    setLoading(true);
    try {
      const authRes = await fetch(
        "https://gymkhana-web.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(auth),
        }
      );

      if (!authRes.ok) {
        alert("Invalid login credentials");
        return;
      }

      const { token } = await authRes.json();

      const delRes = await fetch(
        `https://gymkhana-web.onrender.com/api/events/${event.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!delRes.ok) {
        if (delRes.status === 404) {
          alert("Event already deleted or not found");
        } else {
          alert("Failed to delete event");
        }
      } else {
        alert("Event deleted successfully");
        onDelete(event.id);
        setShowAuth(false);
      }
    } catch {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative flex flex-col rounded-2xl border border-gray-50 bg-white shadow hover:shadow-lg transition">
        <div className="p-7 relative">

          {/* 🔴 RED DOT DELETE */}
          <button
            onClick={handleDeleteClick}
            aria-label="Delete event"
            title="Delete event"
            className="absolute top-3 left-3 w-2 h-2 rounded-full bg-red-150 hover:bg-red-500 transition"
          />

          {/* HEADER */}
          <div className="mb-4 flex items-center gap-4 flex-wrap">
  <div>
    <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight">
      {event.hostingAuthority}
    </h2>
    <p className="text-sm text-slate-600 font-medium uppercase tracking-wide">
       (Organizing Authority)
    </p>
  </div>

  <span className="ml-auto text-base font-semibold text-black tracking-wider flex items-center gap-2">
  <span className="text-lg">📍</span>
  {event.venue}
</span>
</div>

<div className="w-full h-[2px] mb-5 rounded-full bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900" />

         {/* Date */}
 
<div className="text-gray-900 text-base font-bold mb-4 tracking-wide">
  {formatDisplayDateRange(event.startTime, event.endTime)}
</div>

          {/* Description */}
<div className="mb-6">
  <p className="text-sm font-medium text-gray-600 mb-2">
    Overview
  </p>

  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <p className="text-gray-800 text-base leading-relaxed line-clamp-5 hover:line-clamp-none transition-all duration-300">
      {event.description}
    </p>
  </div>
</div>
          {/* REGISTER */}
         {event.registrationForm && (
  <Link
    href={event.registrationForm}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-black font-semibold border border-black px-5 py-2 transition hover:bg-black hover:text-white"
  >
    Register
    <HiOutlineExternalLink className="w-4 h-4" />
  </Link>
)}
        </div>
      </div>

      {/* AUTH MODAL (UNCHANGED) */}
      {showAuth && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full space-y-4 shadow-lg">
            <h3 className="text-xl font-bold text-center">
              Authenticate to Delete
            </h3>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={auth.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={auth.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowAuth(false)}
                disabled={loading}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleAuthSubmit}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
