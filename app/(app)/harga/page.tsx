"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { MarketTable } from "@/components/harga/MarketTable";
import { PriceTrendChart } from "@/components/charts/Charts";
import { FilterChipGroup } from "@/components/ui/FilterChip";
import { mockCommodityPrices, mockPriceTrend } from "@/data/mockData";

const chartFilters = ["Cabai", "Jagung", "Padi"];

export default function HargaPage() {
  const [activeFilter, setActiveFilter] = useState("Cabai");

  return (
    <div className="fade-in">
      <PageHeader
        title="Harga Pasar"
        subtitle="Update harga komoditas pertanian hari ini"
      />

      {/* Trend Chart */}
      <div className="card-base" style={{ padding: 22, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Tren Harga 30 Hari</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Komoditas utama (Rp/kg)</div>
          </div>
          <FilterChipGroup
            options={chartFilters}
            defaultActive="Cabai"
            onChange={setActiveFilter}
          />
        </div>
        <div style={{ height: 220 }}>
          <PriceTrendChart data={mockPriceTrend} />
        </div>
      </div>

      {/* Price Table */}
      <MarketTable data={mockCommodityPrices} />
    </div>
  );
}
