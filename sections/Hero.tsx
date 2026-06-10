"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section id="hero" className="relative h-[600px] overflow-hidden">
      <motion.img
        src="/assets/bg-herosection.png"
        alt="LadangNusa Hero"
        className="absolute inset-0 h-full w-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />
      <div className="absolute inset-0 bg-black/25" />
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-[1600px] px-12">
          <div className="max-w-[1100px]">
            <motion.h1
              className="leading-[1.1] text-white"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.8,
              }}
            >
              <span className="block text-[46px] font-bold italic">
                Kelola Lahan
                <span className="font-normal not-italic">
                  {" "}Lebih Cerdas,
                </span>
              </span>
              <span className="block text-[46px] font-bold italic">
                Panen Lebih Maksimal
                <span className="font-normal not-italic">
                  {" "}dengan
                </span>
                {" "}
                LadangNusa
              </span>
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 30,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: "easeOut",
              }}
              className="mt-4 max-w-[1200px] text-[20px] leading-relaxed text-white"
            >
              Platform berbasis data dan AI yang membantu petani
              menentukan tanaman terbaik, memprediksi hasil panen,
              serta mengoptimalkan keuntungan secara lebih akurat
              dan efisien.
            </motion.p>

            <Link
              href="/dashboard"
              className="animate-pulse-soft mt-12 inline-flex items-center gap-5 rounded-full bg-[#1d9a4e] px-6 py-3 text-[18px] font-semibold text-white"
            >
              <span>Coba Sekarang!</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#1d9a4e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
