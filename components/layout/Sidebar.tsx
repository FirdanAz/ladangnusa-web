"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import { useAuth } from "@/providers/AuthProvider";

const mainNav = [
  { href: "/dashboard", icon: "bi-grid-1x2-fill", label: "Dashboard" },
  { href: "/lahan", icon: "bi-map-fill", label: "Lahan Saya" },
  { href: "/lahan", icon: "bi-cpu-fill", label: "Analisis AI", badge: "Baru", activeOn: "/analisis" },
  { href: "/riwayat", icon: "bi-clock-history", label: "Riwayat Analisis" },
  { href: "/kalender", icon: "bi-calendar3", label: "Kalender Tanam" },
];

const infoNav = [
  { href: "/harga", icon: "bi-graph-up-arrow", label: "Harga Pasar" },
  { href: "/artikel", icon: "bi-journal-text", label: "Artikel Pertanian" },
  { href: "/pengaturan", icon: "bi-gear-fill", label: "Pengaturan" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();
  const { user, logout } = useAuth();

  const isActive = (item: { href: string; activeOn?: string }) =>
    pathname === item.href || (item.activeOn ? pathname === item.activeOn : false);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "show" : ""}`} onClick={close} aria-hidden="true" />

      <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon"><i className="bi bi-tree-fill" /></div>
          <div className="brand-text">
            <div className="brand-name">LadangNusa</div>
            <div className="brand-tagline">AI Smart Farming</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <div className="nav-section-label">Menu Utama</div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {mainNav.map((item) => (
              <li key={item.label} className="nav-item">
                <Link
                  href={item.href}
                  className={`nav-link-item ${isActive(item) ? "active" : ""}`}
                  onClick={close}
                >
                  <i className={`bi ${item.icon}`} />
                  {item.label}
                  {item.badge && <span className="badge-nav">{item.badge}</span>}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-section-label">Informasi</div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {infoNav.map((item) => (
              <li key={item.href} className="nav-item">
                <Link
                  href={item.href}
                  className={`nav-link-item ${pathname === item.href ? "active" : ""}`}
                  onClick={close}
                >
                  <i className={`bi ${item.icon}`} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer — user info dari API */}
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="user-ava">{user?.initials ?? "?"}</div>
            <div className="user-info">
              <div className="user-name">{user?.name ?? "..."}</div>
              <div className="user-role">
                {user?.role ?? ""}{user?.location ? " · " + user.location.split(",")[0] : ""}
              </div>
            </div>
            {/* ✅ Tombol logout */}
            <button
              onClick={logout}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
              title="Keluar"
            >
              <i className="bi bi-box-arrow-right" style={{ color: "rgba(255,255,255,.4)", fontSize: 16 }} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}