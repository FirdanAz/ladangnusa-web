"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: number;
}

export function Modal({ isOpen, onClose, title, subtitle, children, maxWidth = 560 }: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-custom show" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div
        className="modal-box"
        style={{
          background: "var(--bg-card)",
          borderRadius: "var(--radius-xl)",
          border: "1px solid var(--border)",
          maxWidth,
          width: "100%",
          boxShadow: "0 20px 60px rgba(0,0,0,.2)",
        }}
      >
        {/* Header */}
        <div className="modal-header" style={{ padding: "24px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{subtitle}</div>}
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            style={{
              background: "var(--bg-page)", border: "1px solid var(--border)",
              borderRadius: 8, width: 32, height: 32, display: "flex",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              fontSize: 18, color: "var(--text-muted)",
            }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: "20px 24px 24px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}
