import Link from "next/link";
import { ScorePill } from "@/components/ui/ScorePill";
import type { AnalysisHistory } from "@/types";

interface RecentAnalysisProps {
  items: AnalysisHistory[];
}

export function RecentAnalysis({ items }: RecentAnalysisProps) {
  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="analysis-item"
          style={{
            display: "flex", alignItems: "center", gap: 14,
            padding: "14px 0", borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Emoji icon */}
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: item.dotBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, flexShrink: 0,
          }}>
            {item.cropEmoji}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
              {item.crop}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              {item.lahanName} · {item.date.split("·")[0].trim()} · Jenis tanah: {item.soilType}
            </div>
          </div>

          {/* Score + Analisis Ulang */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <ScorePill score={item.score} />
            {/* ✅ Tombol Analisis Ulang */}
            <Link
              href={`/analisis?lahanId=${item.lahanId}`}
              className="btn-outline-green"
              style={{ fontSize: 12, padding: "6px 12px", whiteSpace: "nowrap" }}
            >
              <i className="bi bi-arrow-repeat" /> Ulang
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}