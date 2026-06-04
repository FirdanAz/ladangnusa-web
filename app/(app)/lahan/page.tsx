"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { LahanCard, AddLahanCard } from "@/components/lahan/LahanCard";
import { AddLahanModal } from "@/components/lahan/AddLahanModal";
import { lahanApi } from "@/lib/api";
import type { Lahan } from "@/lib/api";
import type { LahanFormData } from "@/types";

export default function LahanPage() {
  const [lahanList, setLahanList] = useState<Lahan[]>([]);
  const [stats, setStats] = useState({ total: 0, total_area: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // ── Load lahan dari API ──
  useEffect(() => {
    const load = async () => {
      try {
        const res = await lahanApi.list();
        setLahanList(res.data.lahan);
        setStats(res.data.stats);
      } catch (err) {
        console.error("Gagal load lahan:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ── Tambah lahan ──
  const handleAddLahan = async (data: LahanFormData): Promise<Lahan> => {
    // Kirim sebagai FormData supaya support foto
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        // Map camelCase ke snake_case untuk Laravel
        const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
        formData.append(snakeKey, val as string);
      }
    });

    const res = await lahanApi.create(formData);
    if (!res.success) throw new Error(res.message);

    setLahanList((prev) => [res.data, ...prev]);
    setStats((prev) => ({
      ...prev,
      total: prev.total + 1,
      total_area: +(prev.total_area + res.data.area).toFixed(1),
      active: res.data.status === "aktif" ? prev.active + 1 : prev.active,
    }));

    return res.data;
  };

  return (
    <div className="fade-in">
      <PageHeader
        title="Lahan Saya"
        subtitle="Kelola dan pantau semua lahan pertanian Anda"
        action={
          <button className="btn-green" onClick={() => setShowModal(true)}>
            <i className="bi bi-plus-lg" /> Tambah Lahan
          </button>
        }
      />

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { value: loading ? "..." : stats.total, label: "Total Lahan", color: "var(--green-accent)" },
          { value: loading ? "..." : `${stats.total_area} Ha`, label: "Total Luas", color: "var(--amber)" },
          { value: loading ? "..." : stats.active, label: "Aktif Tanam", color: "var(--blue)" },
        ].map((item) => (
          <div key={item.label} className="card-base" style={{ padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Lahan Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🌱</div>
          <div>Memuat data lahan...</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
          {lahanList.map((lahan) => (
            <LahanCard key={lahan.id} lahan={lahan} />
          ))}
          <AddLahanCard onClick={() => setShowModal(true)} />
        </div>
      )}

      <AddLahanModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddLahan}
      />
    </div>
  );
}