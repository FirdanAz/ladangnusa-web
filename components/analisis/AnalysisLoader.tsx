"use client";

import { useEffect, useState } from "react";

interface AnalysisStep {
  id: number;
  label: string;
  sublabel: string;
  duration: number; // ms
  icon: string;
}

const STEPS: AnalysisStep[] = [
  {
    id: 1,
    label: "Membaca data lahan",
    sublabel: "Memuat profil tanah, lokasi, dan riwayat tanam...",
    duration: 1400,
    icon: "bi-map-fill",
  },
  {
    id: 2,
    label: "Menganalisis kondisi tanah & cuaca",
    sublabel: "Mencocokkan jenis tanah, pH, kelembaban, dan pola curah hujan...",
    duration: 1800,
    icon: "bi-cloud-sun-fill",
  },
  {
    id: 3,
    label: "Menghitung skor komoditas",
    sublabel: "Mengevaluasi 24 komoditas berdasarkan kondisi lahan...",
    duration: 2000,
    icon: "bi-bar-chart-fill",
  },
  {
    id: 4,
    label: "Mengevaluasi risiko",
    sublabel: "Memeriksa potensi hama, fluktuasi harga, dan risiko cuaca...",
    duration: 1600,
    icon: "bi-shield-check",
  },
  {
    id: 5,
    label: "Menyusun rekomendasi final",
    sublabel: "Mengompilasi hasil analisis dan menyusun laporan...",
    duration: 1200,
    icon: "bi-cpu-fill",
  },
];

type StepStatus = "pending" | "running" | "done";

interface StepState {
  status: StepStatus;
  progress: number; // 0–100
}

interface AnalysisLoaderProps {
  lahanName: string;
  onComplete: () => void;
}

export function AnalysisLoader({ lahanName, onComplete }: AnalysisLoaderProps) {
  const [stepStates, setStepStates] = useState<StepState[]>(
    STEPS.map(() => ({ status: "pending", progress: 0 }))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const runStep = (index: number) => {
      if (index >= STEPS.length || cancelled) return;

      const step = STEPS[index];
      const intervalMs = 30;
      const totalTicks = step.duration / intervalMs;
      let tick = 0;

      // Mark as running
      setStepStates((prev) =>
        prev.map((s, i) => (i === index ? { status: "running", progress: 0 } : s))
      );
      setCurrentStep(index);

      const interval = setInterval(() => {
        if (cancelled) { clearInterval(interval); return; }
        tick++;
        // Easing: fast start, slow end
        const raw = tick / totalTicks;
        const eased = 1 - Math.pow(1 - raw, 2);
        const progress = Math.min(Math.round(eased * 100), 99);

        setStepStates((prev) =>
          prev.map((s, i) => (i === index ? { ...s, progress } : s))
        );

        if (tick >= totalTicks) {
          clearInterval(interval);
          setStepStates((prev) =>
            prev.map((s, i) => (i === index ? { status: "done", progress: 100 } : s))
          );
          if (index + 1 < STEPS.length) {
            setTimeout(() => runStep(index + 1), 180);
          } else {
            // All done — short pause then call onComplete
            setTimeout(() => {
              if (!cancelled) setAllDone(true);
              setTimeout(() => { if (!cancelled) onComplete(); }, 600);
            }, 400);
          }
        }
      }, intervalMs);
    };

    runStep(0);
    return () => { cancelled = true; };
  }, [onComplete]);

  const totalProgress = Math.round(
    stepStates.reduce((sum, s) => sum + s.progress, 0) / STEPS.length
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "40px 20px",
      }}
      className={`analysis-loader-wrap ${allDone ? "fade-out" : "fade-in"}`}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        {/* Animated AI orb */}
        <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 20px" }}>
          <div className="ai-orb" />
          <div
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <i className="bi bi-cpu-fill" style={{ fontSize: 28, color: "#fff", zIndex: 1 }} />
          </div>
        </div>

        <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
          AI sedang menganalisis
        </div>
        <div style={{ fontSize: 14, color: "var(--text-muted)" }}>
          {lahanName} · Mohon tunggu sebentar
        </div>

        {/* Overall progress */}
        <div style={{ marginTop: 16, width: 240, margin: "16px auto 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Progress keseluruhan</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--green-accent)" }}>{totalProgress}%</span>
          </div>
          <div style={{ height: 6, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${totalProgress}%`,
                background: "linear-gradient(90deg, var(--green-accent), #4ade80)",
                borderRadius: 99,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <div style={{ width: "100%", maxWidth: 540, display: "flex", flexDirection: "column", gap: 10 }}>
        {STEPS.map((step, idx) => {
          const state = stepStates[idx];
          const isRunning = state.status === "running";
          const isDone = state.status === "done";
          const isPending = state.status === "pending";

          return (
            <div
              key={step.id}
              className="loader-step-card"
              style={{
                padding: "14px 18px",
                borderRadius: 14,
                border: `1px solid ${isRunning ? "rgba(29,154,78,.3)" : isDone ? "rgba(29,154,78,.15)" : "var(--border)"}`,
                background: isRunning
                  ? "var(--green-light)"
                  : isDone
                  ? "rgba(29,154,78,.04)"
                  : "var(--bg-card)",
                opacity: isPending ? 0.45 : 1,
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Icon */}
                <div
                  style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: isDone
                      ? "var(--green-accent)"
                      : isRunning
                      ? "var(--green-light)"
                      : "var(--bg-page)",
                    border: isRunning ? "1px solid rgba(29,154,78,.3)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {isDone ? (
                    <i className="bi bi-check-lg" style={{ color: "#fff", fontSize: 16 }} />
                  ) : (
                    <i
                      className={`bi ${step.icon} ${isRunning ? "step-icon-pulse" : ""}`}
                      style={{
                        color: isRunning ? "var(--green-accent)" : "var(--text-muted)",
                        fontSize: 16,
                      }}
                    />
                  )}
                </div>

                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13.5, fontWeight: isRunning || isDone ? 700 : 500,
                    color: isDone ? "var(--green-accent)" : isRunning ? "var(--text-primary)" : "var(--text-muted)",
                    marginBottom: isRunning ? 3 : 0,
                    transition: "color 0.3s",
                  }}>
                    {step.label}
                  </div>
                  {isRunning && (
                    <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.4 }}>
                      {step.sublabel}
                    </div>
                  )}
                </div>

                {/* Right — status */}
                <div style={{ flexShrink: 0 }}>
                  {isDone && (
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: "var(--green-accent)",
                      background: "var(--green-light)", padding: "3px 8px", borderRadius: 20,
                    }}>
                      Selesai
                    </span>
                  )}
                  {isRunning && (
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: "var(--green-accent)",
                    }}>
                      {state.progress}%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar — only when running */}
              {isRunning && (
                <div style={{ marginTop: 10, height: 3, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${state.progress}%`,
                      background: "var(--green-accent)",
                      borderRadius: 99,
                      transition: "width 0.05s linear",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .ai-orb {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--green-accent), #4ade80);
          animation: orb-pulse 2s ease-in-out infinite;
        }
        @keyframes orb-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(29,154,78,.4); }
          50% { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(29,154,78,.0); }
        }
        :global(.step-icon-pulse) {
          animation: icon-pulse 1s ease-in-out infinite;
        }
        @keyframes icon-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .fade-out {
          animation: fade-out 0.5s ease forwards;
        }
        @keyframes fade-out {
          to { opacity: 0; transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}