"use client";

const testimonials = [
  {
    name: "Budi",
    role: "Petani Padi",
    quote:
      "Dengan LadangNusa, saya jadi lebih yakin menentukan tanaman. Sekarang saya bisa memperkirakan hasil sebelum mulai tanam.",
  },
  {
    name: "Siti",
    role: "Petani Sayur",
    quote:
      "Biasanya saya hanya ikut kebiasaan. Kini saya punya data untuk membantu keputusan tanam.",
  },
  {
    name: "Andi",
    role: "Petani Jagung",
    quote:
      "Fitur prediksi hasil panen membantu saya menghitung keuntungan lebih awal.",
  },
  {
    name: "Rahmat",
    role: "Petani Cabai",
    quote:
      "Saya tidak perlu lagi trial-error menentukan komoditas yang cocok untuk lahan saya.",
  },
  {
    name: "Dewi",
    role: "Petani Hortikultura",
    quote:
      "Perencanaan musim tanam jadi lebih terukur dan berdasarkan data.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonial" className="overflow-hidden py-12">
      <div className="mx-auto max-w-[1400px] px-8">

        <div className="mb-14 text-center">
          <h2 className="text-[42px] font-bold leading-tight text-[#202020]">
            Dipercaya untuk Membantu
            <br />
            Keputusan Tanam yang Lebih Baik
          </h2>

          <p className="mt-4 text-[#666666]">
            Pengalaman pengguna yang merasakan manfaat LadangNusa.
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-testimonial gap-6">

            {[...testimonials, ...testimonials].map(
              (item, index) => (
                <div
                  key={index}
                  className="w-[320px] shrink-0 rounded-3xl border border-[#EAEAEA] bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 text-4xl text-[#DCDCDC]">
                    "
                  </div>

                  <p className="h-[95px] text-sm italic leading-relaxed text-[#666666]">
                    {item.quote}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#468432] bg-[#EEF6EA] text-sm font-semibold text-[#468432]">
                      {item.name[0]}
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-[#202020]">
                        {item.name}
                      </h4>

                      <p className="text-xs text-[#777777]">
                        {item.role}
                      </p>

                      <div className="text-xs text-[#468432]">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

          </div>
        </div>

      </div>
    </section>
  );
}