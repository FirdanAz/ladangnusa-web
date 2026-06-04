"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { RecentAnalysis } from "@/components/dashboard/RecentAnalysis";
import { ProfitChart, HarvestChart, ScoreChart } from "@/components/charts/Charts";
import { dashboardApi } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import type { DashboardStats, AnalysisHistory } from "@/lib/api";
import { mockMonthlyData, mockHarvestData, mockScoreData } from "@/data/mockData";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentItems, setRecentItems] = useState<AnalysisHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [statsRes, recentRes] = await Promise.all([
          dashboardApi.stats(),
          dashboardApi.recentAnalysis(),
        ]);
        setStats(statsRes.data);
        setRecentItems(recentRes.data);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 11) return "Selamat Pagi";
    if (h < 15) return "Selamat Siang";
    if (h < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  const latestLahanId = recentItems[0]?.lahanId;

  return (
    <div className="fade-in">
      <PageHeader
        title={`${greeting()}, ${user?.name?.split(" ")[0] ?? ""} 👋`}
        subtitle={new Date().toLocaleDateString("id-ID", {
          weekday: "long", day: "numeric", month: "long", year: "numeric",
        })}
      />

      {/* ── STAT CARDS ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}
        className="stat-grid"
      >
        <StatCard
          label="Total Lahan"
          value={loading ? "..." : stats?.totalLahan ?? 0}
          change={stats?.lahanChange ?? ""}
          changeType="up"
          iconClass="bi-map"
          iconColor="#1d9a4e"
          iconBg="#e8f5ec"
          bgIconClass="bi-map"
        />
        <StatCard
          label="Total Analisis"
          value={loading ? "..." : stats?.totalAnalysis ?? 0}
          change={stats?.analysisChange ?? ""}
          changeType="up"
          iconClass="bi-cpu"
          iconColor="#2563eb"
          iconBg="#dbeafe"
          bgIconClass="bi-cpu"
        />
        <StatCard
          label="Estimasi Profit"
          value={loading ? "..." : stats?.estimatedProfit ?? "Rp0"}
          change={stats?.profitChange ?? ""}
          changeType="up"
          iconClass="bi-currency-dollar"
          iconColor="#d97706"
          iconBg="#fef3c7"
          bgIconClass="bi-cash-stack"
        />
        <StatCard
          label="Top Rekomendasi"
          value={loading ? "..." : stats?.topRecommendation ?? "-"}
          change={stats ? `Skor ${stats.topScore}%` : ""}
          changeType="up"
          iconClass="bi-star-fill"
          iconColor="#db2777"
          iconBg="#fce7f3"
          bgIconClass="bi-star"
        />
      </div>

      {/* ── AI INSIGHT + PROFIT CHART ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 12, marginBottom: 12 }}
        className="insight-grid"
      >
        <AIInsightCard
          score={stats?.topScore ?? 0}
          cropName={stats?.topRecommendation ?? "-"}
          cropEmoji="🌶️"
          insight={
            stats
              ? `Musim ini meningkatkan kecocokan ${stats.topRecommendation} hingga ${stats.topScore}% — kondisi ideal untuk tanam bulan ini.`
              : "Belum ada analisis. Mulai analisis lahan Anda sekarang."
          }
          pills={["🌡️ Suhu optimal", "💧 Pantau curah hujan", "📅 Rencanakan tanam"]}
          lahanId={latestLahanId}
        />
        <div className="card-base chart-card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Estimasi Profit Bulanan</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Realisasi vs proyeksi (Rp Juta)</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "var(--green-light)", color: "var(--green-accent)" }}>
              {stats?.profitChange ?? ""}
            </span>
          </div>
          <div style={{ height: 220 }}>
            <ProfitChart data={mockMonthlyData} />
          </div>
        </div>
      </div>

      {/* ── HARVEST + SCORE CHARTS ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}
        className="charts-grid"
      >
        <div className="card-base chart-card" style={{ padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Hasil Panen (Kwintal)</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>6 bulan terakhir</div>
          <div style={{ height: 180 }}><HarvestChart data={mockHarvestData} /></div>
        </div>
        <div className="card-base chart-card" style={{ padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Skor Rekomendasi AI</div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20 }}>Top 4 tanaman saat ini</div>
          <div style={{ height: 180 }}><ScoreChart data={mockScoreData} /></div>
        </div>
      </div>

      {/* ── RECENT ANALYSIS ── */}
      <div className="card-base" style={{ padding: 22 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Analisis Terbaru</div>
          <Link href="/riwayat" className="btn-outline-green" style={{ fontSize: 13, padding: "8px 16px" }}>
            Lihat Semua
          </Link>
        </div>
        {loading ? (
          <div style={{ textAlign: "center", padding: "24px 0", color: "var(--text-muted)", fontSize: 13 }}>
            Memuat data...
          </div>
        ) : recentItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🌱</div>
            <div style={{ fontSize: 14, color: "var(--text-muted)" }}>Belum ada analisis.</div>
            <Link href="/lahan" className="btn-outline-green" style={{ marginTop: 12, display: "inline-flex" }}>
              Mulai Analisis
            </Link>
          </div>
        ) : (
          <RecentAnalysis items={recentItems} />
        )}
      </div>

      <style jsx>{`
        @media (min-width: 1200px) { .stat-grid { grid-template-columns: repeat(4, 1fr) !important; } }
        @media (max-width: 768px) {
          .insight-grid { grid-template-columns: 1fr !important; }
          .charts-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}