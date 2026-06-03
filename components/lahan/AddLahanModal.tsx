"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import type { LahanFormData, Lahan } from "@/types";

interface AddLahanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LahanFormData) => Promise<Lahan>;
}

const totalSteps = 3;

const stepConfig = [
  { id: 1, label: "Info Dasar" },
  { id: 2, label: "Kondisi Tanah" },
  { id: 3, label: "Upload Foto" },
];

// ✅ Field wajib per step — dipakai untuk trigger validasi sebelum next
const stepFields: Record<number, (keyof LahanFormData)[]> = {
  1: ["name", "area", "season", "location"],
  2: ["soilType"],
  3: [],
};

export function AddLahanModal({ isOpen, onClose, onSubmit }: AddLahanModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [savedLahan, setSavedLahan] = useState<Lahan | null>(null);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
    reset,
  } = useForm<LahanFormData>();

  const handleClose = () => {
    reset();
    setStep(1);
    setSavedLahan(null);
    onClose();
  };

  // ✅ Validasi field step saat ini sebelum lanjut
  const nextStep = async () => {
    const fields = stepFields[step];
    const valid = fields.length === 0 ? true : await trigger(fields);
    if (valid) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const onFormSubmit = async (data: LahanFormData) => {
    try {
      setLoading(true);
      const newLahan = await onSubmit(data);
      setSavedLahan(newLahan);
    } catch {
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalisisNow = () => {
    if (!savedLahan) return;
    handleClose();
    router.push(`/analisis?lahanId=${savedLahan.id}`);
  };

  const stepCircleClass = (s: number) => {
    if (s < step) return "step-circle done";
    if (s === step) return "step-circle active";
    return "step-circle pending";
  };
  const stepLabelClass = (s: number) => {
    if (s <= step) return "step-label active";
    return "step-label pending";
  };

  // ── Success state ──
  if (savedLahan) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Lahan Berhasil Ditambahkan"
        subtitle="Apa yang ingin kamu lakukan selanjutnya?"
        maxWidth={480}
      >
        <div style={{ textAlign: "center", padding: "8px 0 24px" }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "var(--green-light)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            border: "2px solid rgba(29,154,78,.2)",
          }}>
            <i className="bi bi-check-lg" style={{ fontSize: 36, color: "var(--green-accent)" }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
            {savedLahan.emoji} {savedLahan.name}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 28 }}>
            {savedLahan.location} · {savedLahan.area} Ha · Tanah {savedLahan.soilType}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              className="btn-green"
              style={{ width: "100%", justifyContent: "center", padding: "13px 20px", fontSize: 14 }}
              onClick={handleAnalisisNow}
            >
              <i className="bi bi-cpu-fill" /> Langsung Analisis Lahan Ini
            </button>
            <button
              className="btn-outline-green"
              style={{ width: "100%", justifyContent: "center", padding: "13px 20px", fontSize: 14 }}
              onClick={handleClose}
            >
              <i className="bi bi-map" /> Lihat di Daftar Lahan
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tambah Lahan Baru"
      subtitle="Isi data lahan untuk analisis AI yang akurat"
      maxWidth={620}
    >
      {/* Step Indicator */}
      <div className="step-indicator">
        {stepConfig.map((s, idx) => (
          <div key={s.id} style={{ display: "contents" }}>
            <div className="step-dot">
              <div className={stepCircleClass(s.id)}>
                {s.id < step ? <i className="bi bi-check-lg" /> : s.id}
              </div>
              <span className={stepLabelClass(s.id)}>{s.label}</span>
            </div>
            {idx < stepConfig.length - 1 && (
              <div className={`step-line ${s.id < step ? "done" : ""}`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {/* STEP 1 */}
        <div className={`form-section ${step === 1 ? "active" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="form-label-custom">
                Nama Lahan <span style={{ color: "var(--red)" }}>*</span>
              </div>
              <input
                className={`form-control-custom ${errors.name ? "input-error" : ""}`}
                type="text"
                placeholder="cth: Lahan Utara A"
                {...register("name", { required: "Nama lahan wajib diisi" })}
              />
              {errors.name && (
                <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>
                  <i className="bi bi-exclamation-circle" /> {errors.name.message}
                </div>
              )}
            </div>
            <div>
              <div className="form-label-custom">
                Luas Lahan (Hektar) <span style={{ color: "var(--red)" }}>*</span>
              </div>
              <input
                className={`form-control-custom ${errors.area ? "input-error" : ""}`}
                type="number"
                placeholder="cth: 0.8"
                step="0.1"
                {...register("area", { required: "Luas wajib diisi", min: { value: 0.01, message: "Minimal 0.01 Ha" } })}
              />
              {errors.area && (
                <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>
                  <i className="bi bi-exclamation-circle" /> {errors.area.message}
                </div>
              )}
            </div>
            <div>
              <div className="form-label-custom">
                Musim Tanam <span style={{ color: "var(--red)" }}>*</span>
              </div>
              <select
                className={`form-control-custom form-select-custom ${errors.season ? "input-error" : ""}`}
                {...register("season", { required: "Musim tanam wajib dipilih" })}
              >
                <option value="">Pilih musim...</option>
                <option>Musim Kemarau</option>
                <option>Musim Hujan</option>
                <option>Pancaroba</option>
              </select>
              {errors.season && (
                <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>
                  <i className="bi bi-exclamation-circle" /> {errors.season.message}
                </div>
              )}
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="form-label-custom">
                Lokasi Lahan <span style={{ color: "var(--red)" }}>*</span>
              </div>
              <input
                className={`form-control-custom ${errors.location ? "input-error" : ""}`}
                type="text"
                placeholder="cth: Desa Bangsri, Jepara Utara"
                {...register("location", { required: "Lokasi wajib diisi" })}
              />
              {errors.location && (
                <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>
                  <i className="bi bi-exclamation-circle" /> {errors.location.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className={`form-section ${step === 2 ? "active" : ""}`}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div className="form-label-custom">
                Jenis Tanah <span style={{ color: "var(--red)" }}>*</span>
              </div>
              <select
                className={`form-control-custom form-select-custom ${errors.soilType ? "input-error" : ""}`}
                {...register("soilType", { required: "Jenis tanah wajib dipilih" })}
              >
                <option value="">Pilih jenis tanah...</option>
                <option>Lempung</option>
                <option>Pasir</option>
                <option>Aluvial</option>
                <option>Gambut</option>
                <option>Latosol</option>
              </select>
              {errors.soilType && (
                <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>
                  <i className="bi bi-exclamation-circle" /> {errors.soilType.message}
                </div>
              )}
            </div>
            <div>
              <div className="form-label-custom">Ketersediaan Air</div>
              <select className="form-control-custom form-select-custom" {...register("waterAvailability")}>
                <option value="">Pilih...</option>
                <option>Sangat Tersedia</option>
                <option>Tersedia</option>
                <option>Cukup</option>
                <option>Terbatas</option>
              </select>
            </div>
            <div>
              <div className="form-label-custom">pH Tanah (opsional)</div>
              <input
                className="form-control-custom"
                type="number"
                placeholder="cth: 6.5"
                step="0.1"
                min="0"
                max="14"
                {...register("phLevel", { min: 0, max: 14 })}
              />
            </div>
            <div>
              <div className="form-label-custom">Elevasi (mdpl)</div>
              <input
                className="form-control-custom"
                type="number"
                placeholder="cth: 120"
                {...register("elevation")}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="form-label-custom">Riwayat Tanam Terakhir</div>
              <input
                className="form-control-custom"
                type="text"
                placeholder="cth: Padi, 3 bulan lalu"
                {...register("lastCrop")}
              />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <div className="form-label-custom">Catatan Tambahan</div>
              <textarea
                className="form-control-custom"
                rows={3}
                placeholder="Kondisi khusus lahan, masalah yang pernah terjadi, dll..."
                style={{ resize: "vertical" }}
                {...register("notes")}
              />
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className={`form-section ${step === 3 ? "active" : ""}`}>
          <div
            className="upload-zone"
            onClick={() => alert("Upload foto tidak tersedia di demo ini")}
          >
            <i className="bi bi-cloud-arrow-up" />
            <p><span>Klik untuk upload</span> atau seret foto ke sini</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>JPG, PNG, WEBP · Maks 5MB</p>
          </div>
          <div style={{ marginTop: 16, padding: 14, background: "var(--green-light)", borderRadius: 10, border: "1px solid rgba(29,154,78,.15)" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <i className="bi bi-info-circle-fill" style={{ color: "var(--green-accent)", fontSize: 18, flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Foto lahan membantu AI menganalisis kondisi visual seperti tekstur tanah, tutupan vegetasi, dan potensi masalah drainase untuk hasil rekomendasi yang lebih akurat.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24, alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          {step > 1 ? (
            <button type="button" className="btn-ghost" onClick={prevStep}>
              <i className="bi bi-arrow-left" /> Sebelumnya
            </button>
          ) : <div />}
          <div style={{ flex: 1 }} />
          <button type="button" className="btn-ghost" onClick={handleClose}>Batal</button>
          {step < totalSteps ? (
            // ✅ nextStep sekarang async — trigger validasi dulu sebelum lanjut
            <button type="button" className="btn-green" onClick={nextStep}>
              Selanjutnya <i className="bi bi-arrow-right" />
            </button>
          ) : (
            <button type="submit" className="btn-green" disabled={loading}>
              {loading
                ? <><i className="bi bi-hourglass-split" /> Menyimpan...</>
                : <><i className="bi bi-check-lg" /> Simpan Lahan</>
              }
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
}