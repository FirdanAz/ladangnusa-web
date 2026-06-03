interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div
      className="page-header"
      style={{
        marginBottom: 24,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div>
        <div className="page-title" style={{ fontFamily: "Fraunces, serif", fontSize: 26, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "-.4px" }}>
          {title}
        </div>
        {subtitle && (
          <div className="page-subtitle" style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 3 }}>
            {subtitle}
          </div>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
