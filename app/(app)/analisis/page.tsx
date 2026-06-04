"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { HeroRecCard } from "@/components/analisis/HeroRecCard";
import { RecRankCard } from "@/components/analisis/RecRankCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ProfitCompareChart, AnalysisRadarChart } from "@/components/charts/Charts";
import { AnalysisLoader } from "@/components/analisis/AnalysisLoader";
import { analisisApi, lahanApi, ApiError } from "@/lib/api";
import type { AnalysisResult, Lahan } from "@/lib/api";

type PageState = "loading" | "result" | "error";

export default function AnalisisPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lahanId = searchParams.get("lahanId");

  const [pageState, setPageState] = useState<PageState>("loading");
  const [lahan, setLahan] = useState<Lahan | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // ── Redirect kalau tidak ada lahanId ──
  useEffect(() => {
    if (!lahanId) router.replace("/lahan");
  }, [lahanId, router]);

  // ── Fetch lahan detail dulu sebelum analisis ──
  useEffect(() => {
    if (!lahanId) return;

    const fetchLahan = async () => {
      try {
        const numericId = lahanId.replace("lhn_", "").replace(/^0+/, ""); // "lhn_004" → "4"
        const res = await lahanApi.get(numericId);
        setLahan(res.data);
      } catch {
        setErrorMsg(`Lahan dengan ID ${lahanId} tidak ditemukan atau sudah dihapus.`);
        setPageState("error");
      }
    };
    fetchLahan();
  }, [lahanId]);

  // ── Dipanggil AnalysisLoader setelah animasi selesai ──
  const handleLoadComplete = useCallback(async () => {
    if (!lahanId) return;

    try {
      // Ambil numeric ID dari format "lhn_001" → 1
      const numericId = parseInt(lahanId.replace("lhn_", ""));
      const res = await analisisApi.run(numericId);
      setResult(res.data);
      setPageState("result");
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : "Analisis gagal. Silakan coba lagi.";
      setErrorMsg(msg);
      setPageState("error");
    }
  }, [lahanId]);

  if (!lahanId) return null;

  // ── Error state ──
  if (pageState === "error") {
    return (
      <div className="fade-in">
        <PageHeader title="Analisis AI" subtitle="Rekomendasi tanaman berbasis kecerdasan buatan" />
        <div className="card-base" style={{ padding: 40, textAlign: "center", maxWidth: 480, margin: "40px auto" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌾</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>
            {errorMsg.includes("tidak ditemukan") ? "Lahan tidak ditemukan" : "Analisis gagal"}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 24 }}>
            {errorMsg}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/lahan" className="btn-green" style={{ justifyContent: "center" }}>
              <i className="bi bi-map-fill" /> Pilih Lahan
            </Link>
            {!errorMsg.includes("tidak ditemukan") && (
              <button className="btn-outline-green" onClick={() => { setPageState("loading"); setErrorMsg(""); }}>
                <i className="bi bi-arrow-repeat" /> Coba Lagi
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const top = result?.topRecommendation;

  return (
    <div>
      <PageHeader
        title="Analisis AI"
        subtitle={lahan
          ? `Hasil analisis untuk ${lahan.name} · ${lahan.location} · ${lahan.area} Ha`
          : "Rekomendasi tanaman berbasis kecerdasan buatan"
        }
        action={pageState === "result" ? (
          <Link href="/lahan" className="btn-ghost" style={{ fontSize: 13 }}>
            <i className="bi bi-arrow-repeat" /> Ganti Lahan
          </Link>
        ) : undefined}
      />

      {/* ── LOADING STATE ── */}
      {pageState === "loading" && lahan && (
        <AnalysisLoader
          lahanName={`${lahan.emoji} ${lahan.name}`}
          onComplete={handleLoadComplete}
        />
      )}

      {/* ── RESULT STATE ── */}
      {pageState === "result" && lahan && result && top && (
        <div className="fade-in">
          {/* Info lahan */}
          <div className="card-base" style={{
            padding: "14px 20px", marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
            background: "var(--green-light)", border: "1px solid rgba(29,154,78,.2)",
          }}>
            <div style={{ fontSize: 28 }}>{lahan.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>{lahan.name}</div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                {lahan.location} · {lahan.area} Ha · Tanah {lahan.soilType} · Air {lahan.waterAvailability}
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--green-accent)", fontWeight: 600 }}>
              <i className="bi bi-check-circle-fill" /> Analisis selesai
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "5fr 7fr", gap: 12, marginBottom: 12 }} className="analisis-grid">
            {/* LEFT */}
            <div>
              <HeroRecCard recommendation={top} />
              <div className="card-base" style={{ padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="bi bi-lightbulb-fill" style={{ color: "var(--green-accent)" }} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Alasan AI</div>
                </div>
                <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{result.reasoning}</div>
                <div style={{ height: 1, background: "var(--border)", margin: "16px 0" }} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  <div style={{ padding: 12, background: "var(--bg-page)", borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--green-accent)" }}>{top.estimatedHarvest}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Estimasi Panen</div>
                  </div>
                  <div style={{ padding: 12, background: "var(--bg-page)", borderRadius: 10, textAlign: "center" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--amber)" }}>{top.estimatedProfit}/Ha</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Est. Keuntungan/Ha</div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 12 }}>
                {result.recommendations.map((rec) => (
                  <RecRankCard key={rec.rank} recommendation={rec} />
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div className="card-base" style={{ padding: 22 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>Analisis Risiko</div>
                  {result.risks.map((risk: any) => (
                    <div key={risk.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{risk.emoji} {risk.label}</span>
                      <RiskBadge level={risk.level} style={{ fontSize: 11 }}>{risk.level}</RiskBadge>
                    </div>
                  ))}
                </div>
                <div className="card-base" style={{ padding: 22 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Perbandingan Profit</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>Estimasi per hektar (Rp Juta)</div>
                  <div style={{ height: 160 }}>
                    <ProfitCompareChart data={result.recommendations.map((r: any) => ({
                      crop: `${r.emoji} ${r.name}`,
                      profit: parseFloat(r.estimatedProfit.replace(/[^0-9.]/g, "")) || 0,
                      color: r.rank === 1 ? "rgba(29,154,78,0.8)" : r.rank === 2 ? "rgba(217,119,6,0.8)" : "rgba(37,99,235,0.8)",
                    }))} />
                  </div>
                </div>
              </div>
              <div className="card-base" style={{ padding: 22 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Score Visualization</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>Analisis multi-dimensi kondisi lahan</div>
                <div style={{ height: 220 }}>
                  <AnalysisRadarChart data={result.radarData} />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
            <button className="btn-green"><i className="bi bi-download" /> Unduh Laporan</button>
            <Link href={`/kalender?lahanId=${lahanId}&crop=${encodeURIComponent(top.name)}`} className="btn-outline-green">
              <i className="bi bi-calendar-plus" /> Jadwalkan ke Kalender
            </Link>
            <Link href="/lahan" className="btn-outline-green">
              <i className="bi bi-arrow-repeat" /> Analisis Lahan Lain
            </Link>
            <button className="btn-ghost"><i className="bi bi-share" /> Bagikan</button>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 991px) { .analisis-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}