"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";

const STORAGE_KEY = "ladangnusa_welcomed";

const features = [
    {
        emoji: "🗺️",
        title: "Kelola Lahan",
        desc: "Daftarkan semua lahan pertanianmu dan pantau kondisinya kapan saja.",
    },
    {
        emoji: "🤖",
        title: "Analisis AI",
        desc: "Dapatkan rekomendasi tanaman terbaik berdasarkan kondisi lahan & cuaca real-time.",
    },
    {
        emoji: "📅",
        title: "Kalender Tanam",
        desc: "Jadwalkan kegiatan tanam, panen, dan irigasi agar tidak ada yang terlewat.",
    },
    {
        emoji: "📊",
        title: "Harga Pasar",
        desc: "Pantau harga komoditas terkini sebelum memutuskan apa yang akan ditanam.",
    },
];

export function WelcomeModal() {
    const { user } = useAuth();
    const [show, setShow] = useState(false);
    const [slide, setSlide] = useState(0);
    const [leaving, setLeaving] = useState(false);

    useEffect(() => {
        if (!user) return;
        const key = `${STORAGE_KEY}_${user.id}`;
        if (!localStorage.getItem(key)) {
            // Delay sedikit biar dashboard sempat render dulu
            setTimeout(() => setShow(true), 600);
        }
    }, [user]);

    const handleClose = () => {
        setLeaving(true);
        setTimeout(() => {
            setShow(false);
            if (user) localStorage.setItem(`${STORAGE_KEY}_${user.id}`, "1");
        }, 400);
    };

    const handleNext = () => {
        if (slide < features.length - 1) {
            setSlide((s) => s + 1);
        } else {
            handleClose();
        }
    };

    if (!show) return null;

    const isLast = slide === features.length - 1;

    return (
        <>
            {/* Backdrop */}
            <div
                style={{
                    position: "fixed", inset: 0, zIndex: 2000,
                    background: "rgba(0,0,0,.55)",
                    backdropFilter: "blur(4px)",
                    animation: leaving ? "fade-out .4s ease forwards" : "fade-in .3s ease",
                }}
                onClick={handleClose}
            />

            {/* Modal */}
            <div
                style={{
                    position: "fixed", zIndex: 2001,
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "min(520px, 92vw)",
                    background: "var(--bg-card)",
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: "0 32px 80px rgba(0,0,0,.25)",
                    animation: leaving ? "modal-out .4s ease forwards" : "modal-in .4s cubic-bezier(.34,1.56,.64,1)",
                }}
            >
                {/* Header hijau */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #1d9a4e 0%, #0d5a2e 100%)",
                        padding: "36px 32px 28px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Dekoratif lingkaran */}
                    <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,.06)" }} />
                    <div style={{ position: "absolute", bottom: -20, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,.04)" }} />

                    {/* Brand */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, position: "relative" }}>
                        <div style={{
                            width: 48, height: 48, borderRadius: 14,
                            background: "rgba(255,255,255,.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 24,
                        }}>
                            🌿
                        </div>
                        <div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-.3px" }}>LadangNusa</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>AI Smart Farming</div>
                        </div>
                    </div>

                    <div style={{ position: "relative" }}>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 6, lineHeight: 1.2 }}>
                            Selamat datang,<br />{user?.name?.split(" ")[0]} 👋
                        </div>
                        <div style={{ fontSize: 14, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
                            Kenali fitur-fitur LadangNusa yang akan membantu kamu bertani lebih cerdas.
                        </div>
                    </div>
                </div>

                {/* Feature slide */}
                <div style={{ padding: "28px 32px 24px" }}>
                    {/* Slide content */}
                    <div
                        key={slide}
                        style={{
                            display: "flex", gap: 16, alignItems: "flex-start",
                            animation: "slide-in .3s ease",
                            marginBottom: 24,
                        }}
                    >
                        <div style={{
                            width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                            background: "var(--green-light)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 28,
                            border: "1px solid rgba(29,154,78,.15)",
                        }}>
                            {features[slide].emoji}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 17, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                                {features[slide].title}
                            </div>
                            <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                                {features[slide].desc}
                            </div>
                        </div>
                    </div>

                    {/* Dot indicator */}
                    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 24 }}>
                        {features.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setSlide(i)}
                                style={{
                                    width: i === slide ? 20 : 6,
                                    height: 6,
                                    borderRadius: 99,
                                    background: i === slide ? "var(--green-accent)" : "var(--border)",
                                    cursor: "pointer",
                                    transition: "all .3s ease",
                                }}
                            />
                        ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 10 }}>
                        <button
                            className="btn-ghost"
                            style={{ flex: 1, justifyContent: "center", fontSize: 13 }}
                            onClick={handleClose}
                        >
                            Lewati
                        </button>
                        <button
                            className="btn-green"
                            style={{ flex: 2, justifyContent: "center" }}
                            onClick={handleNext}
                        >
                            {isLast ? (
                                <><i className="bi bi-rocket-takeoff" /> Mulai Sekarang!</>
                            ) : (
                                <>Selanjutnya <i className="bi bi-arrow-right" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes fade-out {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes modal-in {
          from { opacity: 0; transform: translate(-50%, -48%) scale(.94); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes modal-out {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to   { opacity: 0; transform: translate(-50%, -52%) scale(.94); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
        </>
    );
}