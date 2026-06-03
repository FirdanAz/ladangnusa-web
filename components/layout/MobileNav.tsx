"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";

const items = [
  { href: "/dashboard", icon: "bi-grid-1x2-fill", label: "Home" },
  { href: "/lahan", icon: "bi-map-fill", label: "Lahan" },
  { href: "/analisis", icon: "bi-cpu-fill", label: "AI" },
  { href: "/harga", icon: "bi-graph-up-arrow", label: "Harga" },
];

export function MobileNav() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <nav className="mob-nav">
      <div className="mob-nav-inner">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mob-nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <i className={`bi ${item.icon}`} />
            {item.label}
          </Link>
        ))}
        <div className="mob-nav-item" onClick={open}>
          <i className="bi bi-list" />
          Menu
        </div>
      </div>
    </nav>
  );
}
