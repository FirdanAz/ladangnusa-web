"use client";

import {
  BarChart, Bar, LineChart, Line, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/providers/ThemeProvider";
import type { MonthlyData, HarvestData, ScoreData } from "@/types";

// ─── SHARED THEME HOOK ───
function useChartTheme() {
  const { isDark } = useTheme();
  return {
    textColor: isDark ? "rgba(232,240,234,0.7)" : "rgba(90,106,94,0.8)",
    gridColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    bgColor: isDark ? "#141f18" : "#ffffff",
  };
}

// ─── PROFIT CHART ───
export function ProfitChart({ data }: { data: MonthlyData[] }) {
  const { textColor, gridColor } = useChartTheme();
  const { isDark } = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barGap={4}>
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `Rp${v}Jt`} />
        <Tooltip
          contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          formatter={(v: number) => [`Rp${v} Juta`, ""]}
        />
        <Legend iconType="circle" iconSize={10} wrapperStyle={{ color: textColor, fontSize: 12 }} />
        <Bar dataKey="realisasi" name="Realisasi" fill="rgba(29,154,78,0.7)" radius={[6, 6, 0, 0]} />
        <Bar dataKey="proyeksi" name="Proyeksi" fill={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── HARVEST CHART ───
export function HarvestChart({ data }: { data: HarvestData[] }) {
  const { textColor, gridColor } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="harvestGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1d9a4e" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#1d9a4e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          formatter={(v: number) => [`${v} Kw`, "Hasil Panen"]}
        />
        <Line type="monotone" dataKey="value" stroke="#1d9a4e" strokeWidth={2} dot={{ fill: "#1d9a4e", r: 4 }} fill="url(#harvestGrad)" />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ─── SCORE CHART (horizontal bar) ───
export function ScoreChart({ data }: { data: ScoreData[] }) {
  const { textColor, gridColor } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" barCategoryGap="30%">
        <CartesianGrid horizontal={false} stroke={gridColor} />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
        <YAxis type="category" dataKey="crop" tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
        <Tooltip
          contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          formatter={(v: number) => [`${v}%`, "Skor"]}
        />
        <Bar dataKey="score" radius={[0, 6, 6, 0]}>
          {data.map((entry, index) => (
            <rect key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── PROFIT COMPARE CHART ───
export function ProfitCompareChart({ data }: { data: { crop: string; profit: number; color: string }[] }) {
  const { textColor, gridColor } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} barCategoryGap="35%">
        <CartesianGrid vertical={false} stroke={gridColor} />
        <XAxis dataKey="crop" tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `Rp${v}Jt`} />
        <Tooltip
          contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          formatter={(v: number) => [`Rp${v} Juta/Ha`, "Estimasi Profit"]}
        />
        <Bar dataKey="profit" radius={[6, 6, 0, 0]}>
          {data.map((entry, index) => (
            <rect key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── RADAR CHART ───
export function AnalysisRadarChart({ data }: { data: { label: string; crop1: number; crop2: number }[] }) {
  const { textColor, gridColor } = useChartTheme();

  const formatted = data.map((d) => ({
    subject: d.label,
    "Cabai Rawit": d.crop1,
    "Jagung Manis": d.crop2,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={formatted}>
        <PolarGrid stroke={gridColor} />
        <PolarAngleAxis dataKey="subject" tick={{ fill: textColor, fontSize: 11 }} />
        <PolarRadiusAxis domain={[50, 100]} tick={{ fill: textColor, fontSize: 10 }} axisLine={false} />
        <Radar name="Cabai Rawit" dataKey="Cabai Rawit" stroke="#1d9a4e" fill="rgba(29,154,78,0.15)" strokeWidth={2} dot={{ r: 3, fill: "#1d9a4e" }} />
        <Radar name="Jagung Manis" dataKey="Jagung Manis" stroke="#d97706" fill="rgba(217,119,6,0.1)" strokeWidth={2} dot={{ r: 3, fill: "#d97706" }} />
        <Legend wrapperStyle={{ color: textColor, fontSize: 12 }} iconType="circle" iconSize={10} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ─── PRICE TREND CHART ───
export function PriceTrendChart({ data }: { data: { date: string; cabai: number; jagung: number; padi: number }[] }) {
  const { textColor, gridColor } = useChartTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke={gridColor} />
        <XAxis dataKey="date" tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: textColor, fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `Rp${(v / 1000).toFixed(0)}k`} />
        <Tooltip
          contentStyle={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 8, color: "var(--text-primary)" }}
          formatter={(v: number) => [`Rp ${v.toLocaleString("id-ID")}`, ""]}
        />
        <Legend wrapperStyle={{ color: textColor, fontSize: 12 }} iconType="circle" iconSize={10} />
        <Line type="monotone" dataKey="cabai" name="Cabai Rawit" stroke="#ef4444" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="jagung" name="Jagung" stroke="#d97706" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="padi" name="Padi" stroke="#2563eb" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
