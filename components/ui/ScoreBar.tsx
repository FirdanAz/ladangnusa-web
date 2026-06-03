type FillColor = "green" | "amber" | "blue" | "red";

interface ScoreBarProps {
  label: string;
  value: number;
  color?: FillColor;
  labelColor?: string;
}

export function ScoreBar({ label, value, color = "green", labelColor }: ScoreBarProps) {
  return (
    <div className="score-bar-wrap">
      <div className="score-bar-label">
        <span>{label}</span>
        <span style={{ color: labelColor ?? "var(--green-accent)", fontWeight: 700 }}>
          {value}%
        </span>
      </div>
      <div className="score-bar-track">
        <div className={`score-bar-fill fill-${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
