"use client";

const items = [
  "Kelola Lahan Lebih Cerdas",
  "Prediksi Panen Lebih Akurat",
  "Ambil Keputusan Berbasis Data",
  "Tingkatkan Keuntungan Pertanian",
  "Solusi AI untuk Petani Indonesia",
  "Analisis Lahan Real-time",
];

export default function RunningText() {
  return (
    <section className="overflow-hidden border-y border-[#eaeaea] bg-white py-5">
      <div className="animate-marquee flex w-max">
        {[...items, ...items].map((item, i) => (
          <div
            key={i}
            className="mx-2 inline-flex items-center gap-2 rounded-full bg-[#e8f5ec] px-5 py-2 text-sm font-semibold text-[#1d9a4e] whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#1d9a4e]" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}