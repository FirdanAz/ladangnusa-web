"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi, setToken, ApiError } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";

export default function RegisterPage() {
    const { updateUser } = useAuth();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        location: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.password) {
            setError("Nama, email, dan password wajib diisi.");
            return;
        }
        if (form.password !== form.password_confirmation) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await authApi.register(form);
            setToken(res.data.token);
            updateUser(res.data.user);
            router.push("/dashboard");
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

    const field = (
        label: string,
        key: keyof typeof form,
        type = "text",
        placeholder = ""
    ) => (
        <div>
            <div className="form-label-custom">{label}</div>
            <input
                className="form-control-custom"
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
            />
        </div>
    );

    return (
        <div className="card-base" style={{ padding: 32 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                Buat Akun Baru
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 24 }}>
                Daftar dan mulai analisis lahan Anda
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
                {field("Nama Lengkap *", "name", "text", "Budi Wicaksono")}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {field("Email *", "email", "email", "nama@email.com")}
                    {field("No. Telepon", "phone", "text", "+62 812-xxxx-xxxx")}
                </div>

                {field("Lokasi / Kota", "location", "text", "Jepara, Jawa Tengah")}

                <div>
                    <div className="form-label-custom">Password *</div>
                    <div style={{ position: "relative" }}>
                        <input
                            className="form-control-custom"
                            type={showPassword ? "text" : "password"}
                            placeholder="Minimal 8 karakter"
                            value={form.password}
                            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
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

                {field("Konfirmasi Password *", "password_confirmation", "password", "Ulangi password")}

                <button
                    className="btn-green"
                    style={{ width: "100%", justifyContent: "center", padding: "13px", fontSize: 14, marginTop: 4 }}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading
                        ? <><i className="bi bi-hourglass-split" /> Mendaftar...</>
                        : <><i className="bi bi-person-plus" /> Daftar Sekarang</>
                    }
                </button>
            </div>

            <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--text-muted)" }}>
                Sudah punya akun?{" "}
                <Link href="/login" style={{ color: "var(--green-accent)", fontWeight: 600 }}>
                    Masuk di sini
                </Link>
            </div>
        </div>
    );
}