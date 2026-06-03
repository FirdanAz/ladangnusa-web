import type { CropRecommendation } from "@/types";

interface HeroRecCardProps {
  recommendation: CropRecommendation;
}

export function HeroRecCard({ recommendation }: HeroRecCardProps) {
  const { name, emoji, score } = recommendation;

  return (
    <div className="hero-rec-card" style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <span className="ai-tag" style={{ marginBottom: 0 }}>
          <div className="ai-pulse" /> #1 Rekomendasi
        </span>
      </div>
      <div className="hero-crop-emoji">{emoji}</div>
      <div className="hero-rec-name">{name}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 8 }}>
        <div className="hero-rec-score">
          {score}<span>%</span>
        </div>
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 16 }}>Kecocokan Lahan</div>
      <div>
        <span className="rec-meta-pill"><i className="bi bi-check-circle" /> Musim Kemarau</span>
        <span className="rec-meta-pill"><i className="bi bi-check-circle" /> Tanah Lempung</span>
        <span className="rec-meta-pill"><i className="bi bi-check-circle" /> pH 6.0–7.0</span>
        <span className="rec-meta-pill"><i className="bi bi-currency-dollar" /> Rp 45.000/kg</span>
      </div>
    </div>
  );
}
