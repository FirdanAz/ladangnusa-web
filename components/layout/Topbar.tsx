"use client";

import { useState } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import { useSidebar } from "@/hooks/useSidebar";
import { mockUser } from "@/data/mockData";

export function Topbar() {
  const { isDark, toggleTheme } = useTheme();
  const { open } = useSidebar();
  const [search, setSearch] = useState("");

  return (
    <header className="topbar" id="topbar">
      {/* Mobile menu toggle */}
      <button className="topbar-btn d-lg-none" onClick={open} style={{ flexShrink: 0 }}>
        <i className="bi bi-list" />
      </button>

      {/* Search */}
      <div className="topbar-search">
        <i className="bi bi-search" style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: 16 }} />
        <input
          type="text"
          placeholder="Cari lahan, analisis, artikel..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar-spacer" style={{ flex: 1 }} />

      {/* Weather */}
      <div
        className="topbar-weather"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 14px",
          background: "var(--green-light)",
          borderRadius: 10,
          cursor: "pointer",
          border: "1px solid rgba(29,154,78,.15)",
        }}
      >
        <span style={{ fontSize: 20 }}>⛅</span>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--green-600)" }}>28°C</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Berawan · Jepara</div>
        </div>
      </div>

      {/* Dark mode toggle */}
      <button className="topbar-btn" onClick={toggleTheme} title="Toggle dark mode">
        <i className={`bi ${isDark ? "bi-sun-fill" : "bi-moon-stars-fill"}`} id="darkIcon" />
      </button>

      {/* Notification */}
      <div className="topbar-btn" style={{ position: "relative" }}>
        <i className="bi bi-bell-fill" />
        <span className="notif-dot" />
      </div>

      {/* Avatar */}
      <div className="topbar-avatar" title={mockUser.name}>
        {mockUser.initials}
      </div>
    </header>
  );
}
