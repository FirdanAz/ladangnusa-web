"use client";

import Link from "next/link";
import { ScoreBar } from "@/components/ui/ScoreBar";
import { RiskBadge } from "@/components/ui/RiskBadge";
import type { Lahan } from "@/types";

interface LahanCardProps {
  lahan: Lahan;
  onEdit?: (id: string) => void;
}

const statusConfig = {
  aktif: { label: "Aktif", level: "Rendah" },
  istirahat: { label: "Istirahat", level: "Sedang" },
  panen: { label: "Panen", level: "Rendah" },
};

const fertilityColor = (val: number) =>
  val >= 75 ? "green" : val >= 55 ? "amber" : "red";

export function LahanCard({ lahan, onEdit }: LahanCardProps) {
  const status = statusConfig[lahan.status];

  return (
    <div className="card-base lahan-card">
      <div
        style={{
          height: 120,
          background: lahan.bgColor,
          borderRadius: "16px 16px 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 56,
        }}
      >
        {lahan.emoji}
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{lahan.name}</div>
          <RiskBadge level={status.level as "Rendah" | "Sedang" | "Tinggi"} style={{ fontSize: 11 }}>
            <i className="bi bi-circle-fill" style={{ fontSize: 8 }} /> {status.label}
          </RiskBadge>
        </div>
        <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
          <i className="bi bi-geo-alt" /> {lahan.location}, {lahan.area} Ha
        </div>
        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>
          Tanah {lahan.soilType} · Air {lahan.waterAvailability}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>
          Tanam terakhir: {lahan.lastCrop} · {lahan.lastCropAgo}
        </div>
        <ScoreBar
          label="Kesuburan"
          value={lahan.fertility}
          color={fertilityColor(lahan.fertility) as "green" | "amber" | "red"}
          labelColor={lahan.fertility >= 75 ? "var(--green-accent)" : lahan.fertility >= 55 ? "var(--amber)" : "var(--red)"}
        />
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          {/* ✅ Kirim lahanId sebagai query param ke halaman analisis */}
          <Link
            href={`/analisis?lahanId=${lahan.id}`}
            className="btn-outline-green"
            style={{ flex: 1, padding: 8, fontSize: 12, justifyContent: "center" }}
          >
            <i className="bi bi-cpu" /> Analisis
          </Link>
          {onEdit && (
            <button
              className="btn-ghost"
              style={{ padding: "8px 12px", fontSize: 12 }}
              onClick={() => onEdit(lahan.id)}
            >
              <i className="bi bi-pencil" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddLahanCard({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="card-base"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: 320, cursor: "pointer",
        borderStyle: "dashed", borderWidth: 2, boxShadow: "none",
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: 40, marginBottom: 12, opacity: .4 }}>
        <i className="bi bi-plus-circle" />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-muted)" }}>Tambah Lahan Baru</div>
      <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 6 }}>Klik untuk mendaftarkan lahan</div>
    </div>
  );
}