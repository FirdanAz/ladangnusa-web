"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Calendar } from "@/components/kalender/Calendar";
import { AddJadwalModal } from "@/components/kalender/AddJadwalModal";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { kalenderApi, lahanApi } from "@/lib/api";
import type { CalendarEvent } from "@/lib/api";
import type { JadwalFormData } from "@/components/kalender/AddJadwalModal";

const eventTypeBadge: Record<string, { label: string; variant: string; style?: React.CSSProperties }> = {
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

  const now = new Date();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());

  // Cari nama lahan dari lahanId kalau ada
  const [fromLahanName, setFromLahanName] = useState<string | null>(null);

  // ── Load events ──
  useEffect(() => {
    const load = async () => {
      try {
        const res = await kalenderApi.list({
          bulan: currentMonth + 1,
          tahun: currentYear,
        });
        setEvents(res.data);
      } catch (err) {
        console.error("Gagal load kalender:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentMonth, currentYear]);

  // ── Kalau dari halaman analisis, fetch nama lahan ──
  useEffect(() => {
    if (!lahanId) return;

    const fetchLahan = async () => {
      try {
        const numericId = lahanId.replace("lhn_", "").replace(/^0+/, ""); // "lhn_004" → "4"
        const res = await lahanApi.get(numericId);
        setFromLahanName(res.data.name);
        setShowModal(true);
      } catch {
        setShowModal(true); // tetap buka modal meski gagal fetch nama
      }
    };
    fetchLahan();
  }, [lahanId]);

  const handleAddJadwal = async (data: JadwalFormData) => {
    try {
      const res = await kalenderApi.create({
        lahan_id: data.lahanId ? parseInt(data.lahanId.replace("lhn_", "")) : undefined,
        title: data.title,
        date: data.date,
        type: data.type,
        notes: data.notes,
      });

      // Tambah event baru ke list kalau bulannya sama
      const eventDate = new Date(data.date);
      if (
        eventDate.getMonth() === currentMonth &&
        eventDate.getFullYear() === currentYear
      ) {
        setEvents((prev) => [...prev, res.data]);
      }

      router.replace("/kalender");
    } catch (err) {
      console.error("Gagal tambah jadwal:", err);
      throw err;
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (lahanId || crop) router.replace("/kalender");
  };

  return (
    <div className="fade-in">
      <PageHeader
        title="Kalender Tanam"
        subtitle="Jadwal tanam dan panen semua lahan Anda"
        action={
          <button className="btn-green" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg" /> Tambah Jadwal
          </button>
        }
      />

      {/* Banner dari analisis */}
      {fromLahanName && crop && (
        <div className="card-base" style={{
          padding: "14px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 12,
          background: "var(--green-light)", border: "1px solid rgba(29,154,78,.2)",
        }}>
          <i className="bi bi-cpu-fill" style={{ fontSize: 20, color: "var(--green-accent)" }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Dari hasil Analisis AI</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              AI merekomendasikan <strong>{crop}</strong> untuk {fromLahanName}. Jadwalkan kapan mulai tanam.
            </div>
          </div>
          <button className="btn-ghost" style={{ fontSize: 12, padding: "6px 10px" }} onClick={() => router.replace("/kalender")}>
            <i className="bi bi-x" />
          </button>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 12 }} className="cal-layout">
        <Calendar
          events={events}
          year={currentYear}
          month={currentMonth}
        />

        <div className="card-base" style={{ padding: 22 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)", marginBottom: 12 }}>
            Jadwal Bulan Ini
          </div>

          {loading ? (
            <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "24px 0" }}>
              Memuat jadwal...
            </div>
          ) : events.length === 0 ? (
            <div style={{ fontSize: 13, color: "var(--text-muted)", textAlign: "center", padding: "24px 0" }}>
              Belum ada jadwal bulan ini
            </div>
          ) : (
            events.map((event) => {
              const badge = eventTypeBadge[event.type] ?? eventTypeBadge.tanam;
              return (
                <div key={event.id} className="cal-event" style={{ borderColor: event.color }}>
                  <div style={{ fontSize: 20 }}>{event.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--text-primary)" }}>{event.title}</div>
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
            })
          )}

          <button
            className="btn-outline-green"
            style={{ width: "100%", justifyContent: "center", marginTop: 12 }}
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-lg" /> Tambah Jadwal
          </button>
        </div>
      </div>

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