"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { useTheme } from "@/providers/ThemeProvider";
import { mockUser, mockPreferences } from "@/data/mockData";
import type { AppPreferences } from "@/types";

const settingsNav = [
  { id: "profil",    icon: "bi-person-fill",          label: "Profil Saya" },
  { id: "notif",     icon: "bi-bell-fill",             label: "Notifikasi" },
  { id: "tampilan",  icon: "bi-palette-fill",          label: "Tampilan" },
  { id: "keamanan",  icon: "bi-shield-fill",           label: "Keamanan" },
  { id: "ai",        icon: "bi-cpu-fill",              label: "AI & Analisis" },
  { id: "data",      icon: "bi-cloud-arrow-up-fill",   label: "Data & Backup" },
];

export default function PengaturanPage() {
  const [activeSection, setActiveSection] = useState("profil");
  const { isDark, toggleTheme } = useTheme();

  const [prefs, setPrefs] = useState<AppPreferences>({
    ...mockPreferences,
    darkMode: isDark,
  });

  const [profile, setProfile] = useState({
    name: mockUser.name,
    phone: mockUser.phone,
    email: mockUser.email,
    location: mockUser.location,
  });

  const handleToggle = (key: keyof AppPreferences) => (checked: boolean) => {
    setPrefs((prev) => ({ ...prev, [key]: checked }));
    if (key === "darkMode") toggleTheme();
  };

  const toggleItems = [
    { key: "darkMode" as const, label: "Mode Gelap", desc: "Aktifkan tampilan gelap" },
    { key: "pushNotifications" as const, label: "Notifikasi Push", desc: "Terima notifikasi harga & jadwal tanam" },
    { key: "autoAnalysis" as const, label: "AI Auto-Analisis", desc: "Analisis otomatis setiap perubahan cuaca" },
    { key: "realtimePriceUpdate" as const, label: "Update Harga Realtime", desc: "Sinkronisasi harga pasar setiap jam" },
  ];

  return (
    <div className="fade-in">
      <PageHeader
        title="Pengaturan"
        subtitle="Kelola akun dan preferensi aplikasi Anda"
      />

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 12 }} className="settings-layout">
        {/* ── SIDEBAR NAV ── */}
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
            <div className="settings-nav-item" style={{ color: "var(--red)" }}>
              <i className="bi bi-box-arrow-right" style={{ color: "var(--red)" }} />
              Keluar
            </div>
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div>
          {/* PROFIL */}
          <div className="card-base" style={{ padding: 28, marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Profil Saya
            </div>

            {/* Avatar section */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              <div style={{
                width: 72, height: 72, borderRadius: 16,
                background: "linear-gradient(135deg,#1d9a4e,#0d5a2e)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 800, color: "#fff", flexShrink: 0,
              }}>
                {mockUser.initials}
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{profile.name}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{profile.email} · {mockUser.role}</div>
                <button className="btn-outline-green" style={{ marginTop: 8, padding: "6px 14px", fontSize: 12 }}>
                  <i className="bi bi-camera" /> Ganti Foto
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <div className="form-label-custom">Nama Lengkap</div>
                <input className="form-control-custom" type="text" value={profile.name}
                  onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
              </div>
              <div>
                <div className="form-label-custom">No. Telepon</div>
                <input className="form-control-custom" type="text" value={profile.phone}
                  onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} />
              </div>
              <div>
                <div className="form-label-custom">Email</div>
                <input className="form-control-custom" type="email" value={profile.email}
                  onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} />
              </div>
              <div>
                <div className="form-label-custom">Lokasi</div>
                <input className="form-control-custom" type="text" value={profile.location}
                  onChange={(e) => setProfile((p) => ({ ...p, location: e.target.value }))} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <button className="btn-green" onClick={() => alert("Perubahan disimpan!")}>
                  <i className="bi bi-check-lg" /> Simpan Perubahan
                </button>
              </div>
            </div>
          </div>

          {/* APP PREFERENCES */}
          <div className="card-base" style={{ padding: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 16 }}>
              Preferensi Aplikasi
            </div>
            <div>
              {toggleItems.map((item, idx) => (
                <div
                  key={item.key}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: idx < toggleItems.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{item.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.desc}</div>
                  </div>
                  <ToggleSwitch
                    checked={prefs[item.key]}
                    onChange={handleToggle(item.key)}
                  />
                </div>
              ))}
            </div>
          </div>
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
