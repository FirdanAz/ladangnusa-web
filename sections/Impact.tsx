"use client";

import { motion } from "framer-motion";
import {
  Users,
  BrainCircuit,
  TrendingUp,
  Clock3,
} from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    title: "Petani Terbantu",
    description:
      "Mendukung petani dalam mengambil keputusan yang lebih tepat.",
    size: "large",
  },
  {
    icon: BrainCircuit,
    value: "95%",
    title: "Akurasi Analisis",
    description:
      "Rekomendasi berbasis data dan teknologi AI.",
    size: "small",
  },
  {
    icon: TrendingUp,
    value: "10.000+",
    title: "Analisis Dibuat",
    description:
      "Simulasi dan rekomendasi yang telah diproses sistem.",
    size: "small",
  },
  {
    icon: Clock3,
    value: "24/7",
    title: "AI Support",
    description:
      "Sistem siap membantu kapan saja dibutuhkan.",
    size: "large",
  },
];

export default function Impact() {
  return (
    <section
      id="impact"
      className="py-20"
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
          <span className="rounded-full bg-[#DFF3D5] px-5 py-2 text-sm font-semibold text-[#468432]">
            Impact & Insights
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#202020]">
            Dampak yang Ingin Kami Hadirkan
          </h2>

          <p className="mt-5 text-lg text-[#666]">
            LadangNusa membantu petani mengambil keputusan
            yang lebih terukur melalui analisis data,
            prediksi, dan teknologi AI yang terus berkembang.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {stats.map((item, index) => {
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
                  y: -8,
                  scale: 1.02,
                }}
                className={`
                  rounded-[32px]
                  border
                  border-[#EAEAEA]
                  bg-white
                  p-8
                  shadow-sm
                  transition-all
                  ${
                    item.size === "large"
                      ? "min-h-[260px]"
                      : "min-h-[220px]"
                  }
                `}
              >
                <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#468432] text-white">
                  <Icon size={30} />
                </div>

                <h3 className="text-5xl font-bold text-[#468432]">
                  {item.value}
                </h3>

                <h4 className="mt-4 text-2xl font-semibold text-[#202020]">
                  {item.title}
                </h4>

                <p className="mt-3 max-w-[420px] leading-relaxed text-[#666]">
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