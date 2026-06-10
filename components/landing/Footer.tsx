"use client";

import { Mail, Phone, MapPin } from "lucide-react";

import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#3E772E] text-white">
      <div className="mx-auto max-w-[1400px] px-8 py-20">
        <div className="grid gap-14 lg:grid-cols-4">
          <div>
            <h2 className="text-[36px] font-bold">
              Ladang<span className="font-normal">Nusa</span>
            </h2>

            <p className="mt-8 max-w-[320px] text-[16px] leading-relaxed text-white/70">
              Platform berbasis data dan AI untuk membantu petani
              mengambil keputusan tanam yang lebih cerdas dan
              menguntungkan.
            </p>

            <div className="mt-10 flex items-center gap-5">
              <a
                href="#"
                aria-label="Instagram"
                className="text-white/70 transition-all duration-300 hover:scale-110 hover:text-[#A6E07F]"
              >
                <FaInstagram size={26} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="text-white/70 transition-all duration-300 hover:scale-110 hover:text-[#A6E07F]"
              >
                <FaFacebookF size={24} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="text-white/70 transition-all duration-300 hover:scale-110 hover:text-[#A6E07F]"
              >
                <FaYoutube size={26} />
              </a>

              <a
                href="#"
                aria-label="WhatsApp"
                className="text-white/70 transition-all duration-300 hover:scale-110 hover:text-[#A6E07F]"
              >
                <FaWhatsapp size={26} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Navigasi</h3>

            <div className="mt-3 h-[3px] w-16 rounded-full bg-[#8FC76A]" />

            <ul className="mt-10 space-y-6">
              <li>
                <a
                  href="#hero"
                  className="text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Beranda
                </a>
              </li>

              <li>
                <a
                  href="#about"
                  className="text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Tentang
                </a>
              </li>

              <li>
                <a
                  href="#features"
                  className="text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Fitur
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="text-white/70 transition-all duration-300 hover:translate-x-1 hover:text-white"
                >
                  Cara Kerja
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Produk</h3>

            <div className="mt-3 h-[3px] w-16 rounded-full bg-[#8FC76A]" />

            <ul className="mt-10 space-y-6 text-white/70">
              <li>Rekomendasi Tanaman</li>
              <li>Prediksi Hasil Panen</li>
              <li>Analisis Keuntungan</li>
              <li>Sistem Pendukung Keputusan</li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">Kontak</h3>

            <div className="mt-3 h-[3px] w-16 rounded-full bg-[#8FC76A]" />

            <div className="mt-10 space-y-8">
              <div className="flex items-center gap-4 text-white/70">
                <Mail size={22} />
                <span>support@ladangnusa.id</span>
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <Phone size={22} />
                <span>+62 812-3456-7890</span>
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <MapPin size={22} />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-10 h-px bg-white/15" />

        <div className="flex flex-col items-center justify-between gap-6 text-white/60 lg:flex-row">
          <p>© 2025 LadangNusa. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Kebijakan Privasi
            </a>

            <span>•</span>
            <a
              href="#"
              className="transition duration-300 hover:text-white"
            >
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}