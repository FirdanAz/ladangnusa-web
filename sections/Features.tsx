"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Sprout, LineChart, Wallet, BrainCircuit } from "lucide-react";

const features = [
  {
    icon: Sprout,
    title: "Rekomendasi Tanaman",
    description:
      "Menentukan tanaman terbaik berdasarkan kondisi lahan dan musim.",
  },
  {
    icon: LineChart,
    title: "Prediksi Hasil Panen",
    description:
      "Memberikan estimasi hasil panen sebelum proses tanam dimulai.",
  },
  {
    icon: Wallet,
    title: "Analisis Keuntungan",
    description:
      "Menghitung potensi profit berdasarkan biaya dan hasil panen.",
  },
  {
    icon: BrainCircuit,
    title: "AI Decision System",
    description:
      "Mengolah data menjadi rekomendasi yang mudah dipahami.",
  },
];

const images = [
  "/assets/about-image.png",
  "/assets/about-image-2.png",
  "/assets/about-image-3.png",
];

export default function Features() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="features" className="py-12">
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2">
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
            }}
          >
            <div className="relative h-[520px] overflow-hidden rounded-[40px] shadow-lg">

              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={images[currentImage]}
                  alt="LadangNusa Features"
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{
                    opacity: 0,
                    scale: 1.05,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                />
              </AnimatePresence>

              <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all duration-300 ${
                      currentImage === index
                        ? "bg-white w-8"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>

            </div>
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
            }}
          >
            <h2 className="mb-10 text-[42px] font-bold leading-tight text-[#202020]">
              Solusi Cerdas dengan
              <br />
              LadangNusa
            </h2>

            <div className="space-y-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
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
                      duration: 0.5,
                      delay: index * 0.15,
                    }}
                    whileHover={{
                      x: 8,
                    }}
                    className="flex items-start gap-5"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#468432] text-white shadow-sm">
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-[22px] font-semibold text-[#202020]">
                        {feature.title}
                      </h3>

                      <p className="mt-1 text-[17px] leading-relaxed text-[#666666]">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}