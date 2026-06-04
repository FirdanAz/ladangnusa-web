"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuth } from "@/providers/AuthProvider";
import { authApi, ApiError } from "@/lib/api";

const settingsNav = [
  { id: "profil", icon: "bi-person-fill", label: "Profil Saya" },
  { id: "keamanan", icon: "bi-shield-fill", label: "Keamanan" },
  { id: "tampilan", icon: "bi-palette-fill", label: "Tampilan" },
];

export default function PengaturanPage() {
  const { user, logout, updateUser } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("profil");

  // ── Profil state ──
  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    location: user?.location ?? "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // ── Password state ──
  const [passwords, setPasswords] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showPasswords, setShowPasswords] = useState(false);

  // ── Handlers ──

  const handleSaveProfile = async () => {
    try {
      setProfileLoading(true);
      setProfileMsg(null);
      const res = await authApi.updateProfile(profile);
      updateUser(res.data);
      setProfileMsg({ type: "success", text: "Profil berhasil diperbarui." });
    } catch (err) {
      const msg = err instanceof ApiError ? err.firstError() : "Terjadi kesalahan.";
      setProfileMsg({ type: "error", text: msg });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.current_password || !passwords.password) {
      setPasswordMsg({ type: "error", text: "Semua field password wajib diisi." });
      return;
    }
    if (passwords.password !== passwords.password_confirmation) {
      setPasswordMsg({ type: "error", text: "Konfirmasi password tidak cocok." });
      return;
    }

    try {
      setPasswordLoading(true);
      setPasswordMsg(null);
      await authApi.changePassword(passwords);
      setPasswords({ current_password: "", password: "", password_confirmation: "" });
      setPasswordMsg({ type: "success", text: "Password berhasil diubah." });
    } catch (err) {
      const msg = err instanceof ApiError ? err.firstError() : "Terjadi kesalahan.";
      setPasswordMsg({ type: "error", text: msg });
    } finally {
      setPasswordLoading(false);
    }
  };

  const StatusMsg = ({ msg }: { msg: { type: string; text: string } | null }) => {
    if (!msg) return null;
    return (
      <div style={{
        padding: "10px 14px", borderRadius: 10, marginBottom: 16,
        background: msg.type === "success" ? "var(--green-light)" : "var(--red-light)",
        border: `1px solid ${msg.type === "success" ? "rgba(29,154,78,.2)" : "rgba(220,38,38,.2)"}`,
        fontSize: 13,
        color: msg.type === "success" ? "var(--green-accent)" : "var(--red)",
      }}>
        <i className={`bi ${msg.type === "success" ? "bi-check-circle" : "bi-exclamation-circle"}`} /> {msg.text}
      </div>
    );
  };

  return (
    <div className="fade-in">
      <PageHeader
        title="Pengaturan"
        subtitle="Kelola akun dan preferensi aplikasi Anda"
      />

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 12 }} className="settings-layout">

        {/* Sidebar nav */}
        <div className="card-base" style={{ padding: 14, alignSelf: "start" }}>
          <div className="settings-nav">
            {settingsNav.map((item) => (
              <div
                key={item.id}
                className={`settings-nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => setActiveSection(item.id)}
              >
                <i className={`bi ${item.icon}`} />
                {item.label}
              </div>
            ))}
            <div className="divider" />
            <div
              className="settings-nav-item"
              style={{ color: "var(--red)", cursor: "pointer" }}
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right" style={{ color: "var(--red)" }} />
              Keluar
            </div>
          </div>
        </div>

        {/* Content */}
        <div>

          {/* ── PROFIL ── */}
          {activeSection === "profil" && (
            <div className="card-base" style={{ padding: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
                Profil Saya
              </div>

              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 14,
                  background: "linear-gradient(135deg,#1d9a4e,#0d5a2e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 800, color: "#fff", flexShrink: 0,
                }}>
                  {user?.initials}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{user?.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{user?.email} · {user?.role}</div>
                </div>
              </div>

              <StatusMsg msg={profileMsg} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <div className="form-label-custom">Nama Lengkap</div>
                  <input
                    className="form-control-custom"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div>
                  <div className="form-label-custom">No. Telepon</div>
                  <input
                    className="form-control-custom"
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <div className="form-label-custom">Email</div>
                  <input
                    className="form-control-custom"
                    type="email"
                    value={user?.email ?? ""}
                    disabled
                    style={{ opacity: 0.6, cursor: "not-allowed" }}
                  />
                </div>
                <div>
                  <div className="form-label-custom">Lokasi</div>
                  <input
                    className="form-control-custom"
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button
                    className="btn-green"
                    onClick={handleSaveProfile}
                    disabled={profileLoading}
                  >
                    {profileLoading
                      ? <><i className="bi bi-hourglass-split" /> Menyimpan...</>
                      : <><i className="bi bi-check-lg" /> Simpan Perubahan</>
                    }
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── KEAMANAN ── */}
          {activeSection === "keamanan" && (
            <div className="card-base" style={{ padding: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
                Ganti Password
              </div>

              <StatusMsg msg={passwordMsg} />

              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 400 }}>
                {[
                  { label: "Password Lama", key: "current_password" as const, placeholder: "Masukkan password lama" },
                  { label: "Password Baru", key: "password" as const, placeholder: "Minimal 8 karakter" },
                  { label: "Konfirmasi Password Baru", key: "password_confirmation" as const, placeholder: "Ulangi password baru" },
                ].map((item) => (
                  <div key={item.key}>
                    <div className="form-label-custom">{item.label}</div>
                    <input
                      className="form-control-custom"
                      type={showPasswords ? "text" : "password"}
                      placeholder={item.placeholder}
                      value={passwords[item.key]}
                      onChange={(e) => setPasswords((p) => ({ ...p, [item.key]: e.target.value }))}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="checkbox"
                    id="showPw"
                    checked={showPasswords}
                    onChange={(e) => setShowPasswords(e.target.checked)}
                  />
                  <label htmlFor="showPw" style={{ fontSize: 13, color: "var(--text-muted)", cursor: "pointer" }}>
                    Tampilkan password
                  </label>
                </div>

                <button
                  className="btn-green"
                  style={{ alignSelf: "flex-start" }}
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                >
                  {passwordLoading
                    ? <><i className="bi bi-hourglass-split" /> Menyimpan...</>
                    : <><i className="bi bi-shield-check" /> Ubah Password</>
                  }
                </button>
              </div>
            </div>
          )}

          {/* ── TAMPILAN ── */}
          {activeSection === "tampilan" && (
            <div className="card-base" style={{ padding: 28 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 20 }}>
                Tampilan
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Mode Gelap</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Aktifkan tampilan gelap</div>
                </div>
                <ToggleSwitch checked={isDark} onChange={toggleTheme} />
              </div>
            </div>
          )}

        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .settings-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}