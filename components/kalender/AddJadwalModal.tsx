"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import { lahanApi } from "@/lib/api";
import type { Lahan } from "@/lib/api";
import type { EventType } from "@/types";

export interface JadwalFormData {
  title: string;
  lahanId: string;
  type: EventType;
  date: string;
  notes?: string;
}

interface AddJadwalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: JadwalFormData) => Promise<void>;
  defaultLahanId?: string;
  defaultCrop?: string;
}

const eventTypeOptions: { value: EventType; label: string; emoji: string }[] = [
  { value: "tanam",     label: "Tanam",     emoji: "🌱" },
  { value: "panen",     label: "Panen",     emoji: "🌾" },
  { value: "semai",     label: "Semai",     emoji: "🫘" },
  { value: "irigasi",   label: "Irigasi",   emoji: "💧" },
  { value: "pemupukan", label: "Pemupukan", emoji: "🧴" },
];

export function AddJadwalModal({
  isOpen,
  onClose,
  onSubmit,
  defaultLahanId,
  defaultCrop,
}: AddJadwalModalProps) {
  const [lahanList, setLahanList] = useState<Lahan[]>([]);

  // ✅ Fetch lahan dari API saat modal dibuka
  useEffect(() => {
    if (!isOpen) return;
    lahanApi.list().then((res) => setLahanList(res.data.lahan)).catch(console.error);
  }, [isOpen]);

  const { register, handleSubmit, reset, setValue, watch } = useForm<JadwalFormData>({
    defaultValues: {
      lahanId: defaultLahanId ?? "",
      type: "tanam",
      title: defaultCrop ? `Tanam ${defaultCrop}` : "",
    },
  });

  useEffect(() => {
    if (defaultLahanId) setValue("lahanId", defaultLahanId);
    if (defaultCrop) setValue("title", `Tanam ${defaultCrop}`);
  }, [defaultLahanId, defaultCrop, setValue]);

  const selectedType = watch("type");
  useEffect(() => {
    if (!defaultCrop) return;
    const label = eventTypeOptions.find((o) => o.value === selectedType)?.label ?? "Tanam";
    setValue("title", `${label} ${defaultCrop}`);
  }, [selectedType, defaultCrop, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onFormSubmit = async (data: JadwalFormData) => {
    await onSubmit(data);
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Tambah Jadwal Tanam"
      subtitle="Catat kegiatan pertanian di kalender"
      maxWidth={500}
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Lahan */}
          <div>
            <div className="form-label-custom">
              Pilih Lahan <span style={{ color: "var(--red)" }}>*</span>
            </div>
            <select
              className="form-control-custom form-select-custom"
              {...register("lahanId", { required: true })}
            >
              <option value="">
                {lahanList.length === 0 ? "Memuat lahan..." : "Pilih lahan..."}
              </option>
              {lahanList.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.emoji} {l.name} — {l.location}
                </option>
              ))}
            </select>
          </div>

          {/* Jenis Kegiatan */}
          <div>
            <div className="form-label-custom">
              Jenis Kegiatan <span style={{ color: "var(--red)" }}>*</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {eventTypeOptions.map((opt) => {
                const checked = selectedType === opt.value;
                return (
                  <label
                    key={opt.value}
                    style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", gap: 4,
                      padding: "10px 6px", borderRadius: 10,
                      border: `1px solid ${checked ? "rgba(29,154,78,.4)" : "var(--border)"}`,
                      background: checked ? "var(--green-light)" : "var(--bg-page)",
                      cursor: "pointer", transition: "all .15s",
                      fontSize: 11,
                      fontWeight: checked ? 700 : 500,
                      color: checked ? "var(--green-accent)" : "var(--text-muted)",
                    }}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      style={{ display: "none" }}
                      {...register("type", { required: true })}
                    />
                    <span style={{ fontSize: 20 }}>{opt.emoji}</span>
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>

          {/* Judul */}
          <div>
            <div className="form-label-custom">
              Judul Jadwal <span style={{ color: "var(--red)" }}>*</span>
            </div>
            <input
              className="form-control-custom"
              type="text"
              placeholder="cth: Tanam Cabai Rawit — Lahan A"
              {...register("title", { required: true })}
            />
          </div>

          {/* Tanggal */}
          <div>
            <div className="form-label-custom">
              Tanggal <span style={{ color: "var(--red)" }}>*</span>
            </div>
            <input
              className="form-control-custom"
              type="date"
              {...register("date", { required: true })}
            />
          </div>

          {/* Catatan */}
          <div>
            <div className="form-label-custom">Catatan (opsional)</div>
            <textarea
              className="form-control-custom"
              rows={2}
              placeholder="Informasi tambahan tentang jadwal ini..."
              style={{ resize: "vertical" }}
              {...register("notes")}
            />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
          <button type="button" className="btn-ghost" onClick={handleClose}>Batal</button>
          <button type="submit" className="btn-green">
            <i className="bi bi-calendar-plus" /> Simpan Jadwal
          </button>
        </div>
      </form>
    </Modal>
  );
}