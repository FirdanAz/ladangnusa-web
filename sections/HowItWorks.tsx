"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "Langkah 1",
    title: "Input Data Lahan",
    description:
      "Masukkan data seperti luas lahan, jenis tanah, dan musim tanam saat ini.",
  },
  {
    step: "Langkah 2",
    title: "Analisis oleh AI",
    description:
      "Sistem mengolah data menggunakan AI dan perhitungan berbasis data agrikultur.",
  },
  {
    step: "Langkah 3",
    title: "Hasil & Rekomendasi",
    description:
      "Dapatkan rekomendasi tanaman, prediksi hasil, dan analisis keuntungan finansial.",
  },
  {
    step: "Langkah 4",
    title: "Ambil Keputusan",
    description:
      "Tentukan langkah tanam dengan lebih percaya diri, terarah, dan berkelanjutan.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12">
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
            duration: 0.8,
          }}
          className="text-center"
        >
          <h2 className="text-[42px] font-bold text-[#202020]">
            Cara Kerja LadangNusa
          </h2>

          <p className="mx-auto mt-4 max-w-[700px] text-[18px] text-[#666666]">
            Dari data sederhana menjadi rekomendasi berbasis AI
            dalam beberapa langkah.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
                key={step.title}
                initial={{
                    opacity: 0,
                    y: 50,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                }}
                whileHover={{
                    y: -8,
                }}
                className="group relative rounded-3xl border border-[#DDE7D7] bg-white p-8 transition-all duration-300 hover:shadow-xl"
                >

              <div className="mb-5 inline-flex rounded-full bg-[#F3F8F0] px-4 py-2 text-sm font-medium text-[#468432]">
                {step.step}
              </div>

              <h3 className="text-[24px] font-semibold text-[#202020]">
                {step.title}
              </h3>

              <p className="mt-4 text-[16px] leading-relaxed text-[#666666]">
                {step.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 rounded-full bg-[#468432] transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}