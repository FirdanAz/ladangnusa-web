"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { LahanCard, AddLahanCard } from "@/components/lahan/LahanCard";
import { AddLahanModal } from "@/components/lahan/AddLahanModal";
import { lahanService } from "@/services/lahanService";
import { mockLahan } from "@/data/mockData";
import type { Lahan, LahanFormData } from "@/types";

export default function LahanPage() {
  const [lahanList, setLahanList] = useState<Lahan[]>(mockLahan);
  const [showModal, setShowModal] = useState(false);

  // ✅ Return Lahan agar AddLahanModal bisa tampilkan success state
  const handleAddLahan = async (data: LahanFormData): Promise<Lahan> => {
    const newLahan = await lahanService.create(data);
    setLahanList((prev) => [...prev, newLahan]);
    return newLahan;
  };

  const totalArea = lahanList.reduce((sum, l) => sum + l.area, 0);
  const activeLahan = lahanList.filter((l) => l.status === "aktif").length;

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
          { value: lahanList.length, label: "Total Lahan", color: "var(--green-accent)" },
          { value: `${totalArea.toFixed(1)} Ha`, label: "Total Luas", color: "var(--amber)" },
          { value: activeLahan, label: "Aktif Tanam", color: "var(--blue)" },
        ].map((item) => (
          <div key={item.label} className="card-base" style={{ padding: "16px 18px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.value}</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Lahan Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
        {lahanList.map((lahan) => (
          <LahanCard key={lahan.id} lahan={lahan} />
        ))}
        <AddLahanCard onClick={() => setShowModal(true)} />
      </div>

      {/* Modal */}
      <AddLahanModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddLahan}
      />
    </div>
  );
}