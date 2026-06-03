import { riskVariant } from "@/lib/utils";
import type { RiskLevel } from "@/types";

interface RiskBadgeProps {
  level: RiskLevel | string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function RiskBadge({ level, className = "", style, children }: RiskBadgeProps) {
  const variant = riskVariant(level);
  return (
    <span className={`risk-badge ${variant} ${className}`} style={style}>
      {children ?? level}
    </span>
  );
}
