"use client";

import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section id="about" className="py-12">
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          >
            <h2 className="max-w-[500px] text-[46px] font-bold leading-[1.1] text-[#202020]">
              Membantu Petani
              <br />
              Mengambil Keputusan
              <br />
              Lebih Cerdas.
            </h2>

            <motion.p
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
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-6 text-[20px] italic text-[#5A5A5A]"
            >
              #SolusiPertanianCerdasUntukIndonesia
            </motion.p>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="flex items-start"
          >
            <p className="max-w-[550px] text-[18px] leading-[1.9] text-[#4F4F4F]">
              LadangNusa dirancang untuk menjawab tantangan nyata di
              sektor pertanian Indonesia dengan pendekatan berbasis data
              dan AI, membantu petani mengelola lahan secara lebih efektif
              dan terukur.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}