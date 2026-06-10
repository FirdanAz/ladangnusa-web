"use client";

import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Calendar,
  BadgePercent,
} from "lucide-react";

const plans = [
  {
    icon: Sparkles,
    title: "Free Trial",
    price: "Rp 0",
    period: "14 Hari",
    badge: "Coba Gratis",
    highlight: false,
    features: [
      "Akses seluruh fitur",
      "Maksimal 3 lahan",
      "20 analisis AI",
      "Tanpa kartu kredit",
      "Support komunitas",
    ],
    button: "Mulai Trial Gratis",
  },
  {
    icon: Calendar,
    title: "Bulanan",
    price: "Rp 49.000",
    period: "/bulan",
    badge: "",
    highlight: false,
    features: [
      "Analisis AI tanpa batas",
      "Rekomendasi tanaman",
      "Prediksi hasil panen",
      "Analisis keuntungan",
      "Riwayat analisis",
    ],
    button: "Langganan Bulanan",
  },
  {
    icon: BadgePercent,
    title: "Tahunan",
    price: "Rp 490.000",
    period: "/tahun",
    badge: "Paling Hemat",
    highlight: true,
    features: [
      "Semua fitur premium",
      "Analisis AI tanpa batas",
      "Prediksi hasil panen",
      "Analisis keuntungan",
      "Prioritas update fitur",
      "Hemat Rp 98.000/tahun",
    ],
    button: "Langganan Tahunan",
  },
];

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-12"
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
          }}
          className="mx-auto mb-16 max-w-[800px] text-center"
        >
          <h2 className="mt-6 text-5xl font-bold text-[#202020]">
            Pilih Paket yang
            <br />
            Sesuai Kebutuhan Anda
          </h2>

          <p className="mt-5 text-lg text-[#666]">
            Mulai secara gratis dan rasakan manfaat
            teknologi AI LadangNusa untuk membantu
            pengambilan keputusan pertanian yang
            lebih cerdas dan menguntungkan.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon;

            return (
              <motion.div
                key={plan.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className={`relative rounded-[32px] border p-8 transition-all
                ${
                  plan.highlight
                    ? "border-[#1d9a4e] bg-[#1d9a4e] text-white shadow-2xl"
                    : "border-[#EAEAEA] bg-white shadow-sm"
                }`}
              >
                {plan.badge && (
                  <div
                    className={`absolute right-6 top-6 rounded-full px-4 py-2 text-sm font-semibold
                    ${
                      plan.highlight
                        ? "bg-white text-[#1d9a4e]"
                        : "bg-[#e8f5ec] text-[#1d9a4e]"
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl
                  ${
                    plan.highlight
                      ? "bg-white text-[#1d9a4e]"
                      : "bg-[#1d9a4e] text-white"
                  }`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="text-3xl font-bold">
                  {plan.title}
                </h3>

                <div className="mt-6">
                  <span className="text-5xl font-bold">
                    {plan.price}
                  </span>

                  <span
                    className={`ml-2 text-lg ${
                      plan.highlight
                        ? "text-white/80"
                        : "text-[#666]"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-10 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <Check
                        size={18}
                        className={
                          plan.highlight
                            ? "text-[#4ade80]"
                            : "text-[#1d9a4e]"
                        }
                      />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-10 w-full rounded-2xl py-4 font-semibold transition-all duration-300
                  ${
                    plan.highlight
                      ? "bg-white text-[#1d9a4e] hover:scale-105"
                      : "bg-[#1d9a4e] text-white hover:scale-105 hover:bg-[#15803d]"
                  }`}
                >
                  {plan.button}
                </button>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-[#777]">
          ✓ Trial gratis 14 hari • ✓ Tanpa kartu kredit • ✓ Bisa upgrade kapan saja
        </p>
      </div>
    </section>
  );
}