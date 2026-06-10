"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";

const menus = [
  { label: "Beranda", href: "#hero", id: "hero" },
  { label: "Tentang", href: "#about", id: "about" },
  { label: "Fitur", href: "#features", id: "features" },
  { label: "Cara Kerja", href: "#how-it-works", id: "how-it-works" },
  { label: "Harga", href: "#pricing", id: "pricing" },
  { label: "Testimoni", href: "#testimonial", id: "testimonial" },
];

export default function Navbar() {
  const [active, setActive] = useState("hero");
  const { user, loading } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#EAEAEA] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-12 py-4">
        {/* Logo */}
        <a
          href="#hero"
          className="flex items-center gap-4"
          onClick={() => setActive("hero")}
        >
          <img src="/assets/logo.png" alt="LadangNusa" className="h-10 w-auto" />
          <h1 className="text-[18px] font-semibold text-[#1d9a4e]">
            Ladang<span className="font-normal">Nusa</span>
          </h1>
        </a>

        {/* Menu */}
        <div className="hidden items-center gap-2 md:flex">
          {menus.map((menu) => (
            <a
              key={menu.id}
              href={menu.href}
              onClick={() => setActive(menu.id)}
              className={`rounded-full px-6 py-1 text-[16px] font-medium transition-all duration-300 ${active === menu.id
                  ? "bg-[#e8f5ec] text-[#1d9a4e]"
                  : "text-[#444] hover:bg-[#F3F7EF] hover:text-[#1d9a4e]"
                }`}
            >
              {menu.label}
            </a>
          ))}
        </div>

        {/* ✅ CTA — berubah sesuai status login */}
        <div className="flex items-center gap-3">
          {!loading && user ? (
            // Sudah login — tampilkan nama + tombol ke dashboard
            <>
              <div className="hidden md:flex items-center gap-2">
                <div
                  style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: "linear-gradient(135deg, #1d9a4e, #0d5a2e)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 700, color: "#fff",
                  }}
                >
                  {user.initials}
                </div>
                <span className="text-[14px] font-medium text-[#444]">
                  {user.name.split(" ")[0]}
                </span>
              </div>
              <Link
                href="/dashboard"
                className="rounded-full bg-[#1d9a4e] px-6 py-2 text-[15px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#15803d] flex items-center gap-2"
              >
                <span>Dashboard</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </>
          ) : (
            // Belum login — tampilkan Login + Coba Sekarang
            <>
              <Link
                href="/login"
                className="rounded-full px-5 py-2 text-[15px] font-semibold text-[#1d9a4e] border border-[#1d9a4e] transition-all duration-300 hover:bg-[#e8f5ec]"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-[#1d9a4e] px-6 py-2 text-[15px] font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#15803d]"
              >
                Coba Sekarang!
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}