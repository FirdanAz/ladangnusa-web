import type {Article,
  MonthlyData, HarvestData, ScoreData,
} from "@/types";

export const mockMonthlyData: MonthlyData[] = [
  { month: "Mar", realisasi: 28, proyeksi: 30 },
  { month: "Apr", realisasi: 31, proyeksi: 33 },
  { month: "Mei", realisasi: 35, proyeksi: 36 },
  { month: "Jun", realisasi: 38, proyeksi: 40 },
  { month: "Jul", realisasi: 42, proyeksi: 44 },
  { month: "Agu", realisasi: 48, proyeksi: 52 },
];

export const mockHarvestData: HarvestData[] = [
  { month: "Mar", value: 42 },
  { month: "Apr", value: 47 },
  { month: "Mei", value: 51 },
  { month: "Jun", value: 58 },
  { month: "Jul", value: 62 },
  { month: "Agu", value: 68 },
];

export const mockScoreData: ScoreData[] = [
  { crop: "🌶️ Cabai", score: 89, color: "rgba(29,154,78,0.8)" },
  { crop: "🌽 Jagung", score: 77, color: "rgba(217,119,6,0.8)" },
  { crop: "🥜 Kacang", score: 68, color: "rgba(37,99,235,0.8)" },
  { crop: "🥬 Kangkung", score: 71, color: "rgba(5,150,105,0.8)" },
];

const genPriceData = (base: number, volatility: number) =>
  Array.from({ length: 10 }, () => Math.round(base + (Math.random() - 0.5) * volatility * 2));

export const mockArticles: Article[] = [
  {
    id: "art_001",
    title: "Strategi Tanam Cabai di Musim Kemarau 2025",
    excerpt: "Panduan lengkap cara mengoptimalkan hasil panen cabai saat musim kemarau dengan teknik irigasi tetes...",
    category: "Teknik Tanam",
    categoryColor: "#16a34a",
    categoryBg: "#dcfce7",
    emoji: "🌶️",
    date: "14 Agu 2025",
    readTime: 7,
    featured: true,
  },
  {
    id: "art_002",
    title: "Harga Jagung Turun, Petani Perlu Strategi Baru",
    excerpt: "Analisis terkini penyebab penurunan harga jagung dan langkah diversifikasi komoditas...",
    category: "Harga Pasar",
    categoryColor: "#d97706",
    categoryBg: "#fef3c7",
    emoji: "🌽",
    date: "12 Agu 2025",
    readTime: 5,
  },
  {
    id: "art_003",
    title: "Mengenal Jenis Tanah untuk Produktivitas Optimal",
    excerpt: "Penjelasan mendalam tentang karakteristik tanah lempung, aluvial, pasir dan cara penanganannya...",
    category: "Pengetahuan",
    categoryColor: "#2563eb",
    categoryBg: "#dbeafe",
    emoji: "🌱",
    date: "10 Agu 2025",
    readTime: 8,
  },
  {
    id: "art_004",
    title: "Memanfaatkan AI untuk Keputusan Pertanian yang Lebih Cerdas",
    excerpt: "Bagaimana petani modern menggunakan kecerdasan buatan untuk meningkatkan produktivitas...",
    category: "Teknologi",
    categoryColor: "#7c3aed",
    categoryBg: "#ede9fe",
    emoji: "🤖",
    date: "2 Agu 2025",
    readTime: 10,
  },
];