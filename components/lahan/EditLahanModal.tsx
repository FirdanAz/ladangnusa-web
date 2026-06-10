"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@/components/ui/Modal";
import type { Lahan } from "@/types";
import type { LahanFormData } from "@/types";

interface EditLahanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, data: FormData) => Promise<void>;
    lahan: Lahan | null;
}

export function EditLahanModal({ isOpen, onClose, onSubmit, lahan }: EditLahanModalProps) {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LahanFormData>();

    // Pre-fill form saat lahan berubah
    useEffect(() => {
        if (!lahan) return;
        reset({
            name: lahan.name,
            location: lahan.location,
            area: lahan.area,
            soilType: lahan.soilType as any,
            waterAvailability: lahan.waterAvailability as any,
            lastCrop: lahan.lastCrop ?? "",
            notes: (lahan as any).notes ?? "",
            phLevel: (lahan as any).phLevel ?? undefined,
            elevation: (lahan as any).elevation ?? undefined,
        });
    }, [lahan, reset]);

    const handleClose = () => {
        setSuccessMsg("");
        setErrorMsg("");
        onClose();
    };

    const onFormSubmit = async (data: LahanFormData) => {
        if (!lahan) return;
        try {
            setLoading(true);
            setErrorMsg("");

            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("location", data.location);
            formData.append("area", String(data.area));
            formData.append("soil_type", data.soilType);
            formData.append("water_availability", data.waterAvailability ?? "");
            if (data.lastCrop) formData.append("last_crop", data.lastCrop);
            if (data.notes) formData.append("notes", data.notes);
            if (data.phLevel) formData.append("ph_level", String(data.phLevel));
            if (data.elevation) formData.append("elevation", String(data.elevation));

            await onSubmit(lahan.id, formData);
            setSuccessMsg("Lahan berhasil diperbarui.");
            setTimeout(handleClose, 1200);
        } catch {
            setErrorMsg("Terjadi kesalahan. Silakan coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    if (!lahan) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Edit Lahan"
            subtitle={`Perbarui data untuk ${lahan.name}`}
            maxWidth={620}
        >
            {successMsg && (
                <div style={{
                    padding: "10px 14px", borderRadius: 10, marginBottom: 16,
                    background: "var(--green-light)", border: "1px solid rgba(29,154,78,.2)",
                    fontSize: 13, color: "var(--green-accent)",
                }}>
                    <i className="bi bi-check-circle" /> {successMsg}
                </div>
            )}
            {errorMsg && (
                <div style={{
                    padding: "10px 14px", borderRadius: 10, marginBottom: 16,
                    background: "var(--red-light)", border: "1px solid rgba(220,38,38,.2)",
                    fontSize: 13, color: "var(--red)",
                }}>
                    <i className="bi bi-exclamation-circle" /> {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit(onFormSubmit)}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>

                    {/* Nama */}
                    <div style={{ gridColumn: "1 / -1" }}>
                        <div className="form-label-custom">Nama Lahan <span style={{ color: "var(--red)" }}>*</span></div>
                        <input
                            className={`form-control-custom ${errors.name ? "input-error" : ""}`}
                            type="text"
                            {...register("name", { required: "Nama wajib diisi" })}
                        />
                        {errors.name && <div style={{ fontSize: 12, color: "var(--red)", marginTop: 4 }}>{errors.name.message}</div>}
                    </div>

                    {/* Luas */}
                    <div>
                        <div className="form-label-custom">Luas (Ha) <span style={{ color: "var(--red)" }}>*</span></div>
                        <input
                            className={`form-control-custom ${errors.area ? "input-error" : ""}`}
                            type="number" step="0.1"
                            {...register("area", { required: "Luas wajib diisi", min: 0.01 })}
                        />
                    </div>

                    {/* Musim */}
                    <div>
                        <div className="form-label-custom">Musim Tanam <span style={{ color: "var(--red)" }}>*</span></div>
                        <select className="form-control-custom form-select-custom" {...register("season", { required: true })}>
                            <option value="">Pilih musim...</option>
                            <option>Musim Kemarau</option>
                            <option>Musim Hujan</option>
                            <option>Pancaroba</option>
                        </select>
                    </div>

                    {/* Lokasi */}
                    <div style={{ gridColumn: "1 / -1" }}>
                        <div className="form-label-custom">Lokasi <span style={{ color: "var(--red)" }}>*</span></div>
                        <input
                            className={`form-control-custom ${errors.location ? "input-error" : ""}`}
                            type="text"
                            {...register("location", { required: "Lokasi wajib diisi" })}
                        />
                    </div>

                    {/* Jenis Tanah */}
                    <div>
                        <div className="form-label-custom">Jenis Tanah <span style={{ color: "var(--red)" }}>*</span></div>
                        <select
                            className={`form-control-custom form-select-custom ${errors.soilType ? "input-error" : ""}`}
                            {...register("soilType", { required: true })}
                        >
                            <option value="">Pilih...</option>
                            <option>Lempung</option>
                            <option>Pasir</option>
                            <option>Aluvial</option>
                            <option>Gambut</option>
                            <option>Latosol</option>
                        </select>
                    </div>

                    {/* Ketersediaan Air */}
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

                    {/* pH */}
                    <div>
                        <div className="form-label-custom">pH Tanah (opsional)</div>
                        <input
                            className="form-control-custom"
                            type="number" step="0.1" min="0" max="14"
                            placeholder="cth: 6.5"
                            {...register("phLevel", { min: 0, max: 14 })}
                        />
                    </div>

                    {/* Elevasi */}
                    <div>
                        <div className="form-label-custom">Elevasi (mdpl)</div>
                        <input
                            className="form-control-custom"
                            type="number"
                            placeholder="cth: 120"
                            {...register("elevation")}
                        />
                    </div>

                    {/* Riwayat Tanam */}
                    <div style={{ gridColumn: "1 / -1" }}>
                        <div className="form-label-custom">Riwayat Tanam Terakhir</div>
                        <input
                            className="form-control-custom"
                            type="text"
                            placeholder="cth: Padi, 3 bulan lalu"
                            {...register("lastCrop")}
                        />
                    </div>

                    {/* Catatan */}
                    <div style={{ gridColumn: "1 / -1" }}>
                        <div className="form-label-custom">Catatan</div>
                        <textarea
                            className="form-control-custom"
                            rows={3}
                            style={{ resize: "vertical" }}
                            {...register("notes")}
                        />
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
                    <button type="button" className="btn-ghost" onClick={handleClose}>Batal</button>
                    <button type="submit" className="btn-green" disabled={loading}>
                        {loading
                            ? <><i className="bi bi-hourglass-split" /> Menyimpan...</>
                            : <><i className="bi bi-check-lg" /> Simpan Perubahan</>
                        }
                    </button>
                </div>
            </form>
        </Modal>
    );
}