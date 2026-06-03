import { ScoreBar } from "@/components/ui/ScoreBar";
import { RiskBadge } from "@/components/ui/RiskBadge";
import type { CropRecommendation } from "@/types";

interface RecRankCardProps {
  recommendation: CropRecommendation;
}

const rankLabels: Record<number, string> = {
  1: "#1 Terbaik",
  2: "#2 Alternatif",
  3: "#3 Cadangan",
};

const rankBarColor = (score: number): "green" | "amber" | "blue" => {
  if (score >= 80) return "green";
  if (score >= 70) return "amber";
  return "blue";
};

const rankLabelColor = (score: number): string => {
  if (score >= 80) return "var(--green-accent)";
  if (score >= 70) return "var(--amber)";
  return "#2563eb";
};

export function RecRankCard({ recommendation }: RecRankCardProps) {
  const { rank, name, emoji, score, riskLevel } = recommendation;

  return (
    <div className="rec-rank-card">
      <div className="rank-num">{rankLabels[rank] ?? `#${rank}`}</div>
      <div className="rank-crop">{emoji}</div>
      <div className="rank-name">{name}</div>
      <ScoreBar
        label="Skor"
        value={score}
        color={rankBarColor(score)}
        labelColor={rankLabelColor(score)}
      />
      <div style={{ marginTop: 10 }}>
        <RiskBadge level={riskLevel} style={{ fontSize: 11 }}>
          Risiko {riskLevel}
        </RiskBadge>
      </div>
    </div>
  );
}
