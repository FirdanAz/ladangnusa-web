"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";
import { ApiError } from "@/lib/api";

export default function LoginPage() {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            setError("Email dan password wajib diisi.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            await login(form.email, form.password);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.firstError());
            } else {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card-base" style={{ padding: 32 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                Selamat Datang
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                Masuk ke akun LadangNusa Anda
            </div>

            {error && (
                <div style={{
                    padding: "10px 14px", borderRadius: 10, marginBottom: 16,
                    background: "var(--red-light)", border: "1px solid rgba(220,38,38,.2)",
                    fontSize: 13, color: "var(--red)",
                }}>
                    <i className="bi bi-exclamation-circle" /> {error}
                </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                    <div className="form-label-custom">Email</div>
                    <input
                        className="form-control-custom"
                        type="email"
                        placeholder="nama@email.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    />
                </div>

                <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div className="form-label-custom" style={{ marginBottom: 0 }}>Password</div>
                        <button
                            type="button"
                            style={{ fontSize: 12, color: "var(--green-accent)", background: "none", border: "none", cursor: "pointer" }}
                        >
                            Lupa password?
                        </button>
                    </div>
                    <div style={{ position: "relative", marginTop: 6 }}>
                        <input
                            className="form-control-custom"
                            type={showPassword ? "text" : "password"}
                            placeholder="Masukkan password"
                            value={form.password}
                            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                            style={{ paddingRight: 40 }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            style={{
                                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                                background: "none", border: "none", cursor: "pointer",
                                color: "var(--text-muted)", fontSize: 16,
                            }}
                        >
                            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`} />
                        </button>
                    </div>
                </div>

                <button
                    className="btn-green"
                    style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14, marginTop: 4 }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading
                        ? <><i className="bi bi-hourglass-split" /> Masuk...</>
                        : <><i className="bi bi-box-arrow-in-right" /> Masuk</>
                    }
                </button>
            </div>

            <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>
                Belum punya akun?{" "}
                <Link href="/register" style={{ color: "var(--green-accent)", fontWeight: 600 }}>
                    Daftar sekarang
                </Link>
            </div>
        </div>
    );
}