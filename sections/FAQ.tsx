"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
} from "lucide-react";

const faqs = [
  {
    question: "Apa itu LadangNusa?",
    answer:
      "LadangNusa adalah platform berbasis data dan AI yang membantu petani dalam mengambil keputusan pertanian, mulai dari rekomendasi tanaman, prediksi hasil panen, hingga analisis potensi keuntungan.",
  },
  {
    question: "Bagaimana cara kerja rekomendasi tanaman?",
    answer:
      "Sistem menganalisis berbagai faktor seperti kondisi lahan, jenis tanah, musim, dan data pendukung lainnya untuk menghasilkan rekomendasi tanaman yang sesuai.",
  },
  {
    question: "Apakah rekomendasi menggunakan AI?",
    answer:
      "Ya. Dashboard LadangNusa memanfaatkan teknologi AI dan Decision Support System (DSS) untuk membantu menghasilkan rekomendasi yang lebih akurat dan berbasis data.",
  },
  {
    question: "Siapa saja yang dapat menggunakan LadangNusa?",
    answer:
      "LadangNusa dapat digunakan oleh petani individu, kelompok tani, penyuluh pertanian, hingga pelaku usaha agribisnis.",
  },
  {
    question: "Apakah data saya aman?",
    answer:
      "Kami menjaga keamanan data pengguna dan hanya menggunakan data yang diperlukan untuk memberikan analisis dan rekomendasi yang relevan.",
  },
  {
    question: "Apakah LadangNusa dapat digunakan di seluruh Indonesia?",
    answer:
      "Ya. LadangNusa dirancang untuk mendukung berbagai kondisi pertanian di Indonesia dan akan terus dikembangkan agar semakin relevan dengan kebutuhan daerah yang berbeda.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-12"
    >
      <div className="mx-auto max-w-[1000px] px-8">
        <div className="mb-14 text-center">

          <h2 className="mt-6 text-5xl font-bold text-[#202020]">
            Pertanyaan yang Sering Diajukan
          </h2>

          <p className="mt-5 text-lg text-[#666]">
            Temukan jawaban atas pertanyaan umum mengenai
            LadangNusa dan teknologi yang kami gunakan.
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              layout
              className="overflow-hidden rounded-3xl border border-[#EAEAEA] bg-white"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-[#202020]">
                  {faq.question}
                </span>

                <motion.div
                  animate={{
                    rotate:
                      active === index ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                >
                  <ChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                  >
                    <div className="px-6 pb-6 text-[#666] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}