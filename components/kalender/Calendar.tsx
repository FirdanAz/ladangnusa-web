"use client";

import { useState, useMemo } from "react";
import type { CalendarEvent } from "@/types";

interface CalendarProps {
  events: CalendarEvent[];
  year?: number;
  month?: number; // 0-indexed
}

const DAYS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTHS = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];

export function Calendar({ events, year: initYear, month: initMonth }: CalendarProps) {
  const now = new Date();
  const [year, setYear] = useState(initYear ?? 2025);
  const [month, setMonth] = useState(initMonth ?? 7); // Aug = 7

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const eventDays = useMemo(() => {
    return events.map((e) => {
      const d = new Date(e.date);
      if (d.getFullYear() === year && d.getMonth() === month) return d.getDate();
      return null;
    }).filter(Boolean) as number[];
  }, [events, year, month]);

  const isToday = (d: number) =>
    d === now.getDate() && month === now.getMonth() && year === now.getFullYear();

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  // Days from previous month to fill grid
  const prevMonthDays = new Date(year, month, 0).getDate();

  return (
    <div className="card-base" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>
          {MONTHS[month]} {year}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost" style={{ padding: "7px 12px", fontSize: 13 }} onClick={prevMonth}>
            <i className="bi bi-chevron-left" />
          </button>
          <button className="btn-ghost" style={{ padding: "7px 12px", fontSize: 13 }} onClick={nextMonth}>
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>

      <div className="cal-grid">
        {/* Headers */}
        {DAYS.map(d => (
          <div key={d} className="cal-header">{d}</div>
        ))}

        {/* Prev month padding */}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`prev-${i}`} className="cal-day other-month">
            {prevMonthDays - firstDay + i + 1}
          </div>
        ))}

        {/* Current month */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const today = isToday(day);
          const hasEvent = eventDays.includes(day) && !today;
          return (
            <div
              key={day}
              className={`cal-day${today ? " today" : ""}${hasEvent ? " has-event" : ""}`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
