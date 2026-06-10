"use client";

import { motion } from "framer-motion";
import {
  Tractor,
  Wallet,
  Clock3,
  TrendingUp,
} from "lucide-react";

export default function Solution() {
  return (
    <section id="solution" className="py-12">
      <div className="mx-auto max-w-[1400px] px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="max-w-[800px] text-[36px] font-bold leading-tight text-[#202020]">
            Lebih dari Sekadar Rekomendasi,
            <br />
            Ini Keuntungan Nyatanya
          </h2>

          <p className="mt-4 text-[18px] text-[#666666]">
            LadangNusa membantu petani mengambil keputusan
            yang lebih tepat, efisien, dan menguntungkan.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-[32px] border border-[#E7E7E7] bg-[#FAFAFA] p-8 lg:col-span-2"
          >
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF6EA]">
                  <Tractor className="text-[#468432]" />
                </div>

                <h3 className="text-[30px] font-bold leading-tight text-[#202020]">
                  Mengurangi Risiko
                  <br />
                  Gagal Panen
                </h3>

                <p className="mt-5 text-[16px] leading-relaxed text-[#666666]">
                  Keputusan berbasis data membantu meminimalkan
                  kesalahan dalam memilih tanaman berdasarkan
                  profil tanah dan cuaca lokal secara presisi.
                </p>
              </div>

              <img
                src="/assets/solutions.png"
                alt="Gagal Panen"
                className="h-[320px] w-full rounded-3xl object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-[32px] bg-[#468432] p-8 text-white"
          >
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <TrendingUp />
            </div>

            <h3 className="text-[30px] font-bold leading-tight">
              Meningkatkan
              <br />
              Produktivitas
              Lahan
            </h3>

            <p className="mt-5 leading-relaxed text-white/80">
              Tanam sesuai kondisi lahan untuk hasil yang lebih
              optimal melalui analisis data tanah yang akurat.
            </p>

            <div className="mt-10 rounded-2xl bg-white/10 p-5">
              <p className="text-xs uppercase tracking-wider">
                Potensi Peningkatan
              </p>

              <h4 className="mt-2 text-4xl font-bold">
                +40%
              </h4>

              <p className="text-sm text-white/70">
                Per Musim
              </p>
            </div>
          </motion.div>

        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-[32px] border border-[#E7E7E7] bg-[#FAFAFA] p-8"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF6EA]">
                <Wallet className="text-[#468432]" />
              </div>

              <div>
                <h3 className="text-[30px] font-bold text-[#202020]">
                  Membantu Perencanaan Keuangan
                </h3>

                <p className="mt-4 text-[16px] leading-relaxed text-[#666666]">
                  Ketahui estimasi keuntungan dan biaya
                  operasional secara transparan sebelum
                  memulai musim tanam.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="rounded-[32px] border border-[#E7E7E7] bg-[#FAFAFA] p-8"
          >
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF6EA]">
                <Clock3 className="text-[#468432]" />
              </div>

              <div>
                <h3 className="text-[30px] font-bold text-[#202020]">
                  Menghemat Waktu & Tenaga
                </h3>

                <p className="mt-4 text-[16px] leading-relaxed text-[#666666]">
                  Tidak perlu trial-error dalam menentukan
                  pola tanam. Sistem memberikan rekomendasi
                  instan untuk efisiensi maksimal di lapangan.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}