"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="py-12 mb-22">
      <div className="mx-auto max-w-[1400px] px-8">

        <motion.div
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
            duration: 0.5,
          }}
          className="group relative overflow-hidden rounded-[32px]"
        >
          <img
            src="/assets/background-cta.png"
            alt="CTA Background"
            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
          <div className="relative z-10 px-12 py-14 md:px-16 md:py-16">
            <motion.h2
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="max-w-[600px] text-[36px] font-bold leading-tight text-white"
            >
            Mulai Ambil Keputusan Tanam
            <br />
            yang Lebih Cerdas Hari Ini
            </motion.h2>
            <motion.p
              initial={{
                opacity: 0,
                x: -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.6,
              }}
              className="mt-4 max-w-[520px] text-[16px] leading-relaxed text-white/90"
            >
              Dapatkan rekomendasi tanaman, prediksi hasil panen, dan analisis keuntungan dalam satu platform.
            </motion.p>

            <motion.button
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.5,
                duration: 0.6,
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="mt-8 flex items-center gap-3 rounded-full bg-white px-6 py-3 font-semibold text-[#1d9a4e] shadow-lg"
            >
              Daftar Sekarang Gratis!
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1d9a4e] text-white">
                <ArrowRight size={18} />
              </div>
            </motion.button>

          </div>
        </motion.div>

      </div>
    </section>
  );
}