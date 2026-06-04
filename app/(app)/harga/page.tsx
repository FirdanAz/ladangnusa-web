"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { MarketTable } from "@/components/harga/MarketTable";
import { PriceTrendChart } from "@/components/charts/Charts";
import { FilterChipGroup } from "@/components/ui/FilterChip";
import { hargaApi } from "@/lib/api";
import type { CommodityPrice } from "@/lib/api";

const chartFilters = ["Cabai", "Jagung", "Padi"];

export default function HargaPage() {
  const [activeFilter, setActiveFilter] = useState("Cabai");
  const [prices, setPrices]             = useState<CommodityPrice[]>([]);
  const [source, setSource]             = useState<string>("");
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await hargaApi.list();
        setPrices(res.data);
        setSource(res.source);
      } catch (err) {
        console.error("Gagal load harga:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Build trend data dari prices untuk chart
  // Karena trend per komoditas perlu endpoint terpisah,
  // untuk chart kita pakai data statis dulu sebagai placeholder
  const trendData = Array.from({ length: 10 }, (_, i) => ({
    date: `${i + 1}/6`,
    cabai: 42000 + Math.round((Math.random() - 0.5) * 8000),
    jagung: 5800 + Math.round((Math.random() - 0.5) * 800),
    padi: 13500 + Math.round((Math.random() - 0.5) * 600),
  }));

  return (
    <div className="fade-in">
      <PageHeader
        title="Harga Pasar"
        subtitle="Update harga komoditas pertanian hari ini"
      />

      {/* Source indicator */}
      {source && !loading && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 12, color: "var(--text-muted)",
          marginBottom: 12,
        }}>
          <i className="bi bi-database" />
          Sumber data: <strong>{source}</strong> (Badan Pangan API - hargapangan.id)
        </div>
      )}

      {/* Trend Chart */}
      <div className="card-base" style={{ padding: 22, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Tren Harga 30 Hari</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Komoditas utama (Rp/kg)</div>
          </div>
          <FilterChipGroup options={chartFilters} defaultActive="Cabai" onChange={setActiveFilter} />
        </div>
        <div style={{ height: 220 }}>
          <PriceTrendChart data={trendData} />
        </div>
      </div>

      {/* Price Table */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📊</div>
          <div>Memuat data harga...</div>
        </div>
      ) : (
        <MarketTable data={prices} />
      )}
    </div>
  );
}