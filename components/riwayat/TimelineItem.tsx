import Link from "next/link";
import { ScorePill } from "@/components/ui/ScorePill";
import type { AnalysisHistory } from "@/types";

const tagVariantStyle: Record<string, { bg: string; color: string }> = {
  green: { bg: "var(--green-light)", color: "var(--green-accent)" },
  amber: { bg: "var(--amber-light)", color: "var(--amber)" },
  blue:  { bg: "var(--blue-light)",  color: "var(--blue)"  },
  red:   { bg: "var(--red-light)",   color: "var(--red)"   },
};

interface TimelineItemProps {
  item: AnalysisHistory;
}

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <div className="timeline-item">
      <div className="timeline-dot" style={{ background: item.dotBg }}>
        {item.cropEmoji}
      </div>
      <div className="timeline-content">
        <div className="timeline-date">{item.date}</div>
        <div className="timeline-card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                {item.crop} — {item.lahanName}
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 3 }}>
                <i className="bi bi-map" /> {item.location} · {item.area} Ha · {item.soilType}
              </div>
            </div>
            <ScorePill score={item.score} />
          </div>

          <div style={{ fontSize: 13.5, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 12 }}>
            {item.summary}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            {/* Tags */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {item.tags.map((tag, i) => {
                const style = tagVariantStyle[tag.variant] ?? tagVariantStyle.green;
                return (
                  <span
                    key={i}
                    style={{
                      fontSize: 12, padding: "4px 10px", borderRadius: 20,
                      background: style.bg, color: style.color, fontWeight: 600,
                    }}
                  >
                    {tag.label}
                  </span>
                );
              })}
            </div>

            {/* ✅ Tombol Analisis Ulang */}
            <Link
              href={`/analisis?lahanId=${item.lahanId}`}
              className="btn-outline-green"
              style={{ fontSize: 12, padding: "6px 14px", whiteSpace: "nowrap" }}
            >
              <i className="bi bi-arrow-repeat" /> Analisis Ulang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}