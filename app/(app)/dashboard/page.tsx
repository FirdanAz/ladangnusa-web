'use client';

import { PageHeader } from "@/components/ui/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";
import { RecentAnalysis } from "@/components/dashboard/RecentAnalysis";
import { ProfitChart, HarvestChart, ScoreChart } from "@/components/charts/Charts";
import {
  mockDashboardStats,
  mockMonthlyData,
  mockHarvestData,
  mockScoreData,
  mockAnalysisHistory,
} from "@/data/mockData";
import Link from "next/link";

export default function DashboardPage() {
  const stats = mockDashboardStats;
  const recentItems = mockAnalysisHistory.slice(0, 4);

  // ✅ Ambil lahanId dari analisis terbaru untuk AIInsightCard
  const latestAnalysis = mockAnalysisHistory[0];

  return (
    <div className="fade-in">
      <PageHeader
        title="Selamat Pagi, Budi 👋"
        subtitle="Jumat, 15 Agustus 2025 · Musim Kemarau sedang berlangsung"
      />

      {/* ── STAT CARDS ── */}
      <div
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 24 }}
        className="stat-grid"
      >
        <StatCard
          label="Total Lahan"
          value={stats.totalLahan}
          change={stats.lahanChange}
          changeType="up"
          iconClass="bi-map"
          iconColor="#1d9a4e"
          iconBg="#e8f5ec"
          bgIconClass="bi-map"
        />
        <StatCard
          label="Total Analisis"
          value={stats.totalAnalysis}
          change={stats.analysisChange}
          changeType="up"
          iconClass="bi-cpu"
          iconColor="#2563eb"
          iconBg="#dbeafe"
          bgIconClass="bi-cpu"
        />
        <StatCard
          label="Estimasi Profit"
          value={stats.estimatedProfit}
          change={stats.profitChange}
          changeType="up"
          iconClass="bi-currency-dollar"
          iconColor="#d97706"
          iconBg="#fef3c7"
          bgIconClass="bi-cash-stack"
        />
        <StatCard
          label="Top Rekomendasi"
          value={stats.topRecommendation}
          change={`Skor ${stats.topScore}%`}
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
        {/* ✅ Pass lahanId dari analisis terbaru */}
        <AIInsightCard
          score={89}
          cropName="cabai rawit"
          cropEmoji="🌶️"
          insight="Musim kemarau meningkatkan kecocokan 🌶️ cabai rawit hingga 89% — kondisi ideal untuk tanam di bulan ini."
          pills={["🌡️ Suhu optimal 28–34°C", "💧 Curah hujan rendah", "📅 Tanam segera"]}
          lahanId={latestAnalysis.lahanId}
        />
        <div className="card-base chart-card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Estimasi Profit Bulanan</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Realisasi vs proyeksi (Rp Juta)</div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, background: "var(--green-light)", color: "var(--green-accent)" }}>
              +12% YoY
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
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Hasil Panen (Kwintal)</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>6 bulan terakhir</div>
            </div>
          </div>
          <div style={{ height: 180 }}>
            <HarvestChart data={mockHarvestData} />
          </div>
        </div>
        <div className="card-base chart-card" style={{ padding: 22 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Skor Rekomendasi AI</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Top 4 tanaman saat ini</div>
            </div>
          </div>
          <div style={{ height: 180 }}>
            <ScoreChart data={mockScoreData} />
          </div>
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
        <RecentAnalysis items={recentItems} />
      </div>

      <style jsx>{`
        @media (min-width: 1200px) {
          .stat-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .insight-grid { grid-template-columns: 1fr !important; }
          .charts-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}