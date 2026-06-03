"use client";

import { useState, useMemo } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { FilterChipGroup } from "@/components/ui/FilterChip";
import { TimelineItem } from "@/components/riwayat/TimelineItem";
import { mockAnalysisHistory } from "@/data/mockData";

const filterOptions = ["Semua", "Minggu ini", "Bulan ini", "Skor Tinggi"];

export default function RiwayatPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");

  const filtered = useMemo(() => {
    let items = mockAnalysisHistory;

    if (filter === "Skor Tinggi") {
      items = items.filter((i) => i.score >= 80);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(
        (i) =>
          i.crop.toLowerCase().includes(q) ||
          i.lahanName.toLowerCase().includes(q) ||
          i.location.toLowerCase().includes(q)
      );
    }

    return items;
  }, [search, filter]);

  return (
    <div className="fade-in">
      <PageHeader
        title="Riwayat Analisis"
        subtitle="Semua hasil analisis AI yang pernah dilakukan"
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <i
            className="bi bi-search"
            style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
          />
          <input
            type="text"
            placeholder="Cari riwayat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "10px 16px 10px 38px",
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: 10, fontSize: 13.5, color: "var(--text-primary)",
              fontFamily: "inherit", outline: "none",
            }}
          />
        </div>
        <FilterChipGroup options={filterOptions} defaultActive="Semua" onChange={setFilter} />
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 760 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Tidak ada riwayat ditemukan</div>
          </div>
        ) : (
          filtered.map((item) => <TimelineItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}
