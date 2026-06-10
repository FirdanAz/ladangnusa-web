"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Sprout,
  TrendingUp,
  Wallet,
  Leaf,
} from "lucide-react";

type AnalysisResult = {
  tanaman: string;
  hasilPanen: number;
  bibit: number;
  keuntungan: number;
};

export default function AIShowcase() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  const [luasLahan, setLuasLahan] = useState(200);
  const [jenisTanah, setJenisTanah] = useState("Lempung");
  const [musim, setMusim] = useState("Musim Hujan");

  const [analysis, setAnalysis] =
    useState<AnalysisResult | null>(null);

  const handleAnalyze = () => {
    setLoading(true);
    setResult(false);

    setTimeout(() => {
      let tanaman = "";
      let hasilPanen = 0;
      let bibit = 0;
      let keuntungan = 0;

      if (musim === "Musim Hujan") {
        if (jenisTanah === "Humus") {
          tanaman = "Cabai Merah";
          bibit = luasLahan * 14;
          hasilPanen = Math.round(luasLahan * 2.2);
          keuntungan = bibit * 5000;
        } else {
          tanaman = "Padi";
          bibit = luasLahan * 25;
          hasilPanen = Math.round(luasLahan * 4);
          keuntungan = bibit * 2000;
        }
      } else {
        if (jenisTanah === "Pasir") {
          tanaman = "Semangka";
          bibit = luasLahan * 3;
          hasilPanen = Math.round(luasLahan * 3);
          keuntungan = bibit * 12000;
        } else {
          tanaman = "Jagung";
          bibit = luasLahan * 8;
          hasilPanen = Math.round(luasLahan * 2.8);
          keuntungan = bibit * 3500;
        }
      }

      setAnalysis({
        tanaman,
        hasilPanen,
        bibit,
        keuntungan,
      });

      setLoading(false);
      setResult(true);
    }, 1800);
  };

  return (
    <section
      id="ai-demo"
      className="py-12"
    >
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
        <div className="mb-16 text-center">
          <span className="rounded-full bg-[#DFF3D5] px-5 py-2 text-sm font-semibold text-[#468432]">
            AI Decision Support System
          </span>

          <h2 className="mt-6 text-5xl font-bold text-[#202020]">
            Rasakan Cara Kerja AI LadangNusa
          </h2>

          <p className="mx-auto mt-5 max-w-[700px] text-lg text-[#666]">
            Coba simulasi sederhana untuk melihat bagaimana
            LadangNusa membantu petani mengambil keputusan
            berdasarkan kondisi lahan, musim, dan potensi hasil panen.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
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
            className="rounded-[32px] bg-white p-8 shadow-lg"
          >
            <div className="mb-8 flex items-center gap-3">
              <Brain className="text-[#468432]" />
              <h3 className="text-2xl font-bold">
                Simulasi Sistem Pendukung <br /> Pengambilan Keputusan
              </h3>
            </div>

            <div className="space-y-6">

              <div>
                <label className="mb-2 block font-medium">
                  Luas Lahan (m²)
                </label>

                <input
                  type="number"
                  value={luasLahan}
                  onChange={(e) =>
                    setLuasLahan(Number(e.target.value))
                  }
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#468432]"
                />
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Jenis Tanah
                </label>

                <select
                  value={jenisTanah}
                  onChange={(e) =>
                    setJenisTanah(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#468432]"
                >
                  <option>Lempung</option>
                  <option>Pasir</option>
                  <option>Humus</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block font-medium">
                  Kondisi Musim
                </label>

                <select
                  value={musim}
                  onChange={(e) =>
                    setMusim(e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 p-4 outline-none transition focus:border-[#468432]"
                >
                  <option>Musim Hujan</option>
                  <option>Musim Kemarau</option>
                </select>
              </div>

              <button
                onClick={handleAnalyze}
                className="w-full rounded-xl bg-[#468432] py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-[#356626]"
              >
                Analisis Sekarang
              </button>
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
            className="rounded-[32px] bg-[#468432] p-8 text-white shadow-lg"
          >
            <h3 className="mb-8 text-2xl font-bold">
              Hasil Analisis AI
            </h3>

            <AnimatePresence mode="wait">

              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-[420px] flex-col items-center justify-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                    className="mb-6"
                  >
                    <Brain size={60} />
                  </motion.div>

                  <p className="text-lg text-white/80">
                    AI sedang menganalisis lahan...
                  </p>
                </motion.div>
              ) : result && analysis ? (
                <motion.div
                  key="result"
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="space-y-5"
                >

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <Sprout className="text-[#B9E98B]" />

                      <div>
                        <p className="text-sm text-white/70">
                          Tanaman Direkomendasikan
                        </p>

                        <h4 className="text-2xl font-bold">
                          {analysis.tanaman}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <Leaf className="text-[#B9E98B]" />

                      <div>
                        <p className="text-sm text-white/70">
                          Jumlah Bibit
                        </p>

                        <h4 className="text-2xl font-bold">
                          {analysis.bibit.toLocaleString(
                            "id-ID"
                          )}{" "}
                          Bibit
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="text-[#B9E98B]" />

                      <div>
                        <p className="text-sm text-white/70">
                          Prediksi Hasil Panen
                        </p>

                        <h4 className="text-2xl font-bold">
                          ±{" "}
                          {analysis.hasilPanen.toLocaleString(
                            "id-ID"
                          )}{" "}
                          Kg
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <Wallet className="text-[#B9E98B]" />

                      <div>
                        <p className="text-sm text-white/70">
                          Potensi Keuntungan
                        </p>

                        <h4 className="text-2xl font-bold">
                          Rp{" "}
                          {analysis.keuntungan.toLocaleString(
                            "id-ID"
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-[420px] items-center justify-center text-center"
                >
                  <p className="max-w-[350px] text-lg text-white/70">
                    Klik tombol Analisis Sekarang untuk
                    melihat rekomendasi AI berdasarkan
                    kondisi lahan yang Anda masukkan.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}