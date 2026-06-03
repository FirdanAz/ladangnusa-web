"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Calendar } from "@/components/kalender/Calendar";
import { AddJadwalModal } from "@/components/kalender/AddJadwalModal";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { mockCalendarEvents, mockLahan } from "@/data/mockData";
import type { CalendarEvent } from "@/types";
import type { JadwalFormData } from "@/components/kalender/AddJadwalModal";

const eventTypeBadge: Record<
  CalendarEvent["type"],
  { label: string; variant: string; style?: React.CSSProperties }
> = {
  tanam: { label: "Tanam", variant: "Rendah" },
  panen: { label: "Panen", variant: "Sedang" },
  irigasi: { label: "Irigasi", variant: "Sedang", style: { background: "var(--blue-light)", color: "var(--blue)" } },
  semai: { label: "Semai", variant: "Rendah" },
  pemupukan: { label: "Pemupukan", variant: "Sedang" },
};

export default function KalenderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const lahanId = searchParams.get("lahanId");
  const crop = searchParams.get("crop");

  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [showModal, setShowModal] = useState(false);

  // ✅ Kalau ada lahanId + crop dari halaman analisis, langsung buka modal
  useEffect(() => {
    if (lahanId && crop) {
      setShowModal(true);
    }
  }, [lahanId, crop]);

  const fromLahan = lahanId ? mockLahan.find((l) => l.id === lahanId) : null;

  const handleAddJadwal = async (data: JadwalFormData) => {
    // Nanti diganti dengan API call
    // await jadwalService.create(data)

    // Setelah simpan, bersihkan query params supaya tidak re-trigger
    router.replace("/kalender");
  };

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    // Bersihkan query params kalau modal ditutup manual
    if (lahanId || crop) router.replace("/kalender");
  };

  return (
    <div className="fade-in">
      <PageHeader
        title="Kalender Tanam"
        subtitle="Jadwal tanam dan panen semua lahan Anda"
        action={
          <button className="btn-green" onClick={handleOpenModal}>
            <i className="bi bi-plus-lg" /> Tambah Jadwal
          </button>
        }
      />

      {/* ✅ Banner kalau user datang dari halaman analisis */}
      {fromLahan && crop && (
        <div
          className="card-base"
          style={{
            padding: "14px 20px",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "var(--green-light)",
            border: "1px solid rgba(29,154,78,.2)",
          }}
        >
          <i className="bi bi-cpu-fill" style={{ fontSize: 20, color: "var(--green-accent)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
              Dari hasil Analisis AI
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              AI merekomendasikan <strong>{crop}</strong> untuk {fromLahan.name}. Jadwalkan kapan mulai tanam.
            </div>
          </div>
          <button
            className="btn-ghost"
            style={{ fontSize: 12, padding: "6px 10px" }}
            onClick={() => router.replace("/kalender")}
          >
            <i className="bi bi-x" />
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 12 }} className="cal-layout">
        {/* Calendar */}
        <Calendar events={events} year={2025} month={7} />

        {/* Events Sidebar */}
        <div className="card-base" style={{ padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Jadwal Bulan Ini
          </div>

          {events.length === 0 && (
            <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "24px 0" }}>
              Belum ada jadwal bulan ini
            </div>
          )}

          {events.map((event) => {
            const badge = eventTypeBadge[event.type];
            return (
              <div key={event.id} className="cal-event" style={{ borderColor: event.color }}>
                <div style={{ fontSize: 20 }}>{event.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>
                    {event.title}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{event.date}</div>
                </div>
                <RiskBadge
                  level={badge.variant as "Rendah" | "Sedang" | "Tinggi"}
                  style={{ marginLeft: "auto", fontSize: 11, ...badge.style }}
                >
                  {badge.label}
                </RiskBadge>
              </div>
            );
          })}

          <button
            className="btn-outline-green"
            style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
            onClick={handleOpenModal}
          >
            <i className="bi bi-plus-lg" /> Tambah Jadwal
          </button>
        </div>
      </div>

      {/* Modal */}
      <AddJadwalModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSubmit={handleAddJadwal}
        defaultLahanId={lahanId ?? undefined}
        defaultCrop={crop ?? undefined}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .cal-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}