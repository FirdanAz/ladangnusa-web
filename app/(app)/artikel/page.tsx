"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleCard } from "@/components/artikel/ArticleCard";
import { FilterChipGroup } from "@/components/ui/FilterChip";
import { mockArticles } from "@/data/mockData";

const categories = ["Semua", "Teknik Tanam", "Harga Pasar", "Pengetahuan", "Teknologi"];

export default function ArtikelPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = mockArticles.filter((a) => {
    const matchCat = activeCategory === "Semua" || a.category === activeCategory;
    const matchSearch = !search.trim() || a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = mockArticles.find((a) => a.featured);

  return (
    <div className="fade-in">
      <PageHeader
        title="Artikel Pertanian"
        subtitle="Informasi terkini seputar pertanian, teknologi, dan pasar komoditas"
      />

      {/* Featured Article */}
      {featured && (
        <div
          className="card-base"
          style={{
            marginBottom: 24, overflow: "hidden", cursor: "pointer",
            background: "linear-gradient(135deg, #0f2a1a, #1a4a2a)",
            border: "1px solid rgba(74,222,128,.15)",
          }}
        >
          <div style={{ padding: "32px 28px", display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
            <div style={{ fontSize: 72 }}>{featured.emoji}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "rgba(74,222,128,.12)", color: "#4ade80", marginBottom: 10 }}>
                ⭐ Artikel Pilihan
              </span>
              <div style={{ fontFamily: "Fraunces, serif", fontSize: 22, fontWeight: 600, color: "#e8f5ec", lineHeight: 1.3, marginBottom: 8 }}>
                {featured.title}
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
                {featured.excerpt}
              </div>
              <div style={{ marginTop: 14, display: "flex", gap: 12, fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                <span>{featured.date}</span>
                <span>· {featured.readTime} mnt baca</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <i className="bi bi-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", padding: "10px 16px 10px 38px", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 10, fontSize: 13.5, color: "var(--text-primary)", fontFamily: "inherit", outline: "none" }}
          />
        </div>
        <FilterChipGroup options={categories} defaultActive="Semua" onChange={setActiveCategory} />
      </div>

      {/* Articles Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {filtered.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
        {filtered.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📰</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Tidak ada artikel ditemukan</div>
          </div>
        )}
      </div>
    </div>
  );
}
