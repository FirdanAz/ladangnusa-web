import Link from "next/link";

interface AIInsightCardProps {
  score: number;
  cropName: string;
  cropEmoji: string;
  insight: string;
  pills?: string[];
  // ✅ lahanId untuk link ke halaman analisis
  lahanId?: string;
}

export function AIInsightCard({ score, cropName, cropEmoji, insight, pills = [], lahanId }: AIInsightCardProps) {
  return (
    <div className="ai-insight-card h-100" style={{ height: "100%" }}>
      <div className="ai-tag">
        <div className="ai-pulse" />
        AI Insight
      </div>
      <div className="ai-insight-text">
        {insight.split(cropEmoji).map((part, i) =>
          i === 0 ? part : (
            <span key={i}>
              <span>{cropEmoji} {cropName}</span>{part}
            </span>
          )
        )}
      </div>
      <div className="divider" style={{ background: "rgba(255,255,255,.08)", height: 1, margin: "20px 0" }} />
      <div className="ai-confidence">
        <span style={{ fontSize: 16, fontWeight: 800, color: "#4ade80" }}>{score}%</span>
        <div className="ai-confidence-bar">
          <div className="ai-confidence-fill" style={{ width: `${score}%` }} />
        </div>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)", whiteSpace: "nowrap" }}>Confidence Score</span>
      </div>
      {pills.length > 0 && (
        <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
          {pills.map((pill) => (
            <span key={pill} className="rec-meta-pill">{pill}</span>
          ))}
        </div>
      )}

      {/* ✅ Tombol lihat detail — hanya muncul kalau lahanId tersedia */}
      {lahanId && (
        <div style={{ marginTop: 20 }}>
          <Link
            href={`/analisis?lahanId=${lahanId}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: "#4ade80",
              textDecoration: "none",
              padding: "8px 16px",
              borderRadius: 10,
              border: "1px solid rgba(74,222,128,.25)",
              background: "rgba(74,222,128,.08)",
              transition: "all .2s",
            }}
          >
            <i className="bi bi-cpu-fill" /> Lihat Detail Analisis
          </Link>
        </div>
      )}
    </div>
  );
}