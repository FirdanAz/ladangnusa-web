"use client";

import { motion } from "framer-motion";
import {
  Database,
  BrainCircuit,
  Wallet,
  Sprout,
} from "lucide-react";

const reasons = [
  {
    icon: Database,
    title: "Berbasis Data",
    description:
      "Keputusan tidak lagi berdasarkan perkiraan semata. LadangNusa memanfaatkan data untuk memberikan rekomendasi yang lebih akurat.",
  },
  {
    icon: BrainCircuit,
    title: "Didukung AI",
    description:
      "Teknologi AI membantu menganalisis berbagai faktor pertanian untuk menghasilkan rekomendasi yang relevan.",
  },
  {
    icon: Wallet,
    title: "Fokus pada Keuntungan",
    description:
      "Membantu memperkirakan potensi hasil panen dan keuntungan agar keputusan lebih menguntungkan.",
  },
  {
    icon: Sprout,
    title: "Mudah Digunakan",
    description:
      "Dirancang dengan antarmuka sederhana sehingga mudah digunakan oleh petani maupun penyuluh pertanian.",
  },
];

export default function WhyUs() {
  return (
    <section
      id="why-us"
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
            Kenapa Memilih LadangNusa?
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#666]">
            LadangNusa membantu petani mengambil keputusan
            yang lebih tepat melalui analisis berbasis data
            dan teknologi AI sehingga proses budidaya menjadi
            lebih efisien, terukur, dan menguntungkan.
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
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
                }}
                className="rounded-[28px] border border-[#EAEAEA] bg-white p-8 shadow-sm transition-all"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#468432] text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mb-4 text-2xl font-bold text-[#202020]">
                  {item.title}
                </h3>

                <p className="leading-relaxed text-[#666]">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}