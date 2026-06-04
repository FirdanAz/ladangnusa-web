export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bg-page)",
                padding: "20px",
            }}
        >
            {/* Brand header */}
            <div style={{ width: "100%", maxWidth: 440 }}>
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div
                        style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: "linear-gradient(135deg, #1d9a4e, #0d5a2e)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 12px",
                            fontSize: 26,
                        }}
                    >
                        🌿
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>
                        LadangNusa
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                        AI Smart Farming
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}