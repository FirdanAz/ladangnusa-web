// ─── LAHAN FORM ───
// Union types ini hanya untuk form input (AddLahanModal), bukan response API
export type LahanStatus       = "aktif" | "istirahat" | "panen";
export type SoilType          = "Lempung" | "Pasir" | "Aluvial" | "Gambut" | "Latosol";
export type Season            = "Musim Kemarau" | "Musim Hujan" | "Pancaroba";
export type WaterAvailability = "Sangat Tersedia" | "Tersedia" | "Cukup" | "Terbatas";
export type RiskLevel         = "Rendah" | "Sedang" | "Tinggi";
export type EventType         = "tanam" | "panen" | "irigasi" | "semai" | "pemupukan";

// ─── LAHAN ───
// Pakai string biasa agar kompatibel dengan response API dari lib/api.ts
export interface Lahan {
  id: string;
  name: string;
  location: string;
  area: number;
  soilType: string;          // ← string, bukan SoilType
  waterAvailability: string; // ← string, bukan WaterAvailability
  status: string;            // ← string, bukan LahanStatus
  fertility: number;
  emoji: string;
  bgColor: string;
  lastCrop: string;
  lastCropAgo: string;
  phLevel?: number;
  elevation?: number;
  notes?: string;
  photoUrl?: string;
  createdAt: string;
}

export interface LahanFormData {
  name: string;
  area: number;
  season: Season;
  location: string;
  soilType: SoilType;          // form tetap strict
  waterAvailability: WaterAvailability;
  phLevel?: number;
  elevation?: number;
  lastCrop?: string;
  notes?: string;
  photos?: File[];
}

// ─── ANALISIS ───
export interface CropRecommendation {
  rank: number;
  name: string;
  emoji: string;
  score: number;
  riskLevel: string;
  estimatedHarvest: string;
  estimatedProfit: string;
}

export interface AnalysisResult {
  id: string;
  lahanId: string;
  lahanName: string;
  recommendations: CropRecommendation[];
  topRecommendation: CropRecommendation;
  reasoning: string;
  confidenceScore: number;
  risks: { label: string; level: string; emoji: string }[];
  radarData: { label: string; crop1: number; crop2: number }[];
  createdAt: string;
}

export interface AnalysisHistory {
  id: string;
  lahanId: string;
  crop: string;
  cropEmoji: string;
  lahanName: string;
  location: string;
  area: number;
  soilType: string;
  score: number;
  date: string;
  summary: string;
  tags: { label: string; variant: "green" | "amber" | "blue" | "red" }[];
  dotBg: string;
}

// ─── HARGA ───
export interface CommodityPrice {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  change: number;
  changePercent7d: number;
  unit: string;
  trend: "up" | "down" | "stable";
  updatedAt: string;
}

export interface PriceTrendData {
  date: string;
  cabai: number;
  jagung: number;
  padi: number;
}

// ─── KALENDER ───
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: string;
  emoji: string;
  color: string;
  lahanName: string;
  lahanId?: string;
  notes?: string;
  rawDate?: string;
}

// ─── ARTIKEL ───
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  categoryBg: string;
  emoji: string;
  date: string;
  readTime: number;
  featured?: boolean;
}

// ─── STATS ───
export interface DashboardStats {
  totalLahan: number;
  lahanChange: string;
  totalAnalysis: number;
  analysisChange: string;
  estimatedProfit: string;
  profitChange: string;
  topRecommendation: string;
  topScore: number;
}

// ─── CHART DATA ───
export interface MonthlyData {
  month: string;
  realisasi: number;
  proyeksi: number;
}

export interface HarvestData {
  month: string;
  value: number;
}

export interface ScoreData {
  crop: string;
  score: number;
  color: string;
}

// ─── API RESPONSE ───
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── SETTINGS ───
export interface AppPreferences {
  darkMode: boolean;
  pushNotifications: boolean;
  autoAnalysis: boolean;
  realtimePriceUpdate: boolean;
}

// ─── USER ───
export interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: string;
  location: string;
}