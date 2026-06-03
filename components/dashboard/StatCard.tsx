interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  changeType: "up" | "down";
  iconClass: string;
  iconColor: string;
  iconBg: string;
  bgIconClass?: string;
}

export function StatCard({
  label, value, change, changeType,
  iconClass, iconColor, iconBg, bgIconClass,
}: StatCardProps) {
  return (
    <div className="card-base stat-card" style={{ padding: "22px 22px 18px", position: "relative", overflow: "hidden" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 22 }}>
        <i className={`bi ${iconClass}`} style={{ color: iconColor, fontSize: 22 }} />
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, letterSpacing: ".3px", textTransform: "uppercase" }}>
        {label}
      </div>
      <div style={{ fontSize: typeof value === "string" && value.length > 8 ? 22 : 28, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.15, marginTop: 4, letterSpacing: -1 }}>
        {value}
      </div>
      <div className={`stat-change ${changeType}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, marginTop: 8, padding: "3px 8px", borderRadius: 20 }}>
        <i className={`bi ${changeType === "up" ? "bi-arrow-up-short" : "bi-arrow-down-short"}`} />
        {change}
      </div>
      {bgIconClass && (
        <div style={{ position: "absolute", right: -10, top: -10, opacity: .05, fontSize: 80, color: "var(--text-primary)", pointerEvents: "none" }}>
          <i className={`bi ${bgIconClass}`} />
        </div>
      )}
    </div>
  );
}
