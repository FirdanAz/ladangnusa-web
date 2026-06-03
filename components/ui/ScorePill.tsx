import { scoreVariant } from "@/lib/utils";

interface ScorePillProps {
  score: number;
  className?: string;
}

export function ScorePill({ score, className = "" }: ScorePillProps) {
  const variant = scoreVariant(score);
  return (
    <span className={`score-pill score-${variant} ${className}`}>
      {score}%
    </span>
  );
}
