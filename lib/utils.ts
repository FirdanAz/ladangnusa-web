import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, short = false): string {
  if (short) {
    if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
    if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)} Rb`;
  }
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("id-ID");
}

export function scoreVariant(score: number): "high" | "mid" | "low" {
  if (score >= 80) return "high";
  if (score >= 65) return "mid";
  return "low";
}

export function riskVariant(level: string): "risk-low" | "risk-medium" | "risk-high" {
  if (level === "Rendah") return "risk-low";
  if (level === "Sedang") return "risk-medium";
  return "risk-high";
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
