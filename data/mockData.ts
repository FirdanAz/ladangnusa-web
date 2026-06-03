import type {
  User, Lahan, AnalysisHistory, AnalysisResult,
  CommodityPrice, PriceTrendData, CalendarEvent, Article,
  DashboardStats, MonthlyData, HarvestData, ScoreData, AppPreferences,
} from "@/types";

export const mockUser: User = {
  id: "usr_001",
  name: "Budi Wicaksono",
  initials: "BW",
  email: "budi.wicaksono@email.com",
  phone: "+62 812-3456-7890",
  role: "Petani Mandiri",
  location: "Jepara, Jawa Tengah",
};

export const mockDashboardStats: DashboardStats = {
  totalLahan: 4,
  lahanChange: "+1 bulan ini",
  totalAnalysis: 28,
  analysisChange: "6 minggu ini",
  estimatedProfit: "Rp48,2 Jt",
  profitChange: "+12% vs lalu",
  topRecommendation: "🌶️ Cabai",
  topScore: 89,
};

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

export const mockLahan: Lahan[] = [
  {
    id: "lhn_001",
    name: "Lahan Utara A",
    location: "Kudus Utara",
    area: 0.8,
    soilType: "Lempung",
    waterAvailability: "Tersedia",
    status: "aktif",
    fertility: 82,
    emoji: "🌾",
    bgColor: "#e8f5ec",
    lastCrop: "Padi",
    lastCropAgo: "3 bln lalu",
    createdAt: "2025-01-01",
  },
  {
    id: "lhn_002",
    name: "Lahan Barat B",
    location: "Jepara Barat",
    area: 1.0,
    soilType: "Aluvial",
    waterAvailability: "Cukup",
    status: "aktif",
    fertility: 76,
    emoji: "🌽",
    bgColor: "#fef3c7",
    lastCrop: "Jagung",
    lastCropAgo: "1 bln lalu",
    createdAt: "2025-01-01",
  },
  {
    id: "lhn_003",
    name: "Lahan Selatan C",
    location: "Jepara Selatan",
    area: 0.9,
    soilType: "Pasir",
    waterAvailability: "Terbatas",
    status: "istirahat",
    fertility: 58,
    emoji: "🥬",
    bgColor: "#dcfce7",
    lastCrop: "Kacang",
    lastCropAgo: "2 bln lalu",
    createdAt: "2025-02-01",
  },
  {
    id: "lhn_004",
    name: "Lahan Timur D",
    location: "Jepara Timur",
    area: 0.5,
    soilType: "Lempung",
    waterAvailability: "Cukup",
    status: "aktif",
    fertility: 69,
    emoji: "🍅",
    bgColor: "#dbeafe",
    lastCrop: "Tomat",
    lastCropAgo: "1.5 bln lalu",
    createdAt: "2025-03-01",
  },
  {
    id: "lhn_006",
    name: "Lahan Timur E",
    location: "Kudus Timur",
    area: 0.5,
    soilType: "Lempung",
    waterAvailability: "Cukup",
    status: "aktif",
    fertility: 99,
    emoji: "🍅",
    bgColor: "#dbeafe",
    lastCrop: "Tomat",
    lastCropAgo: "1.5 bln lalu",
    createdAt: "2025-03-01",
  },
];

export const mockAnalysisResult: AnalysisResult = {
  id: "ana_001",
  lahanId: "lhn_001",
  lahanName: "Lahan Utara A",
  recommendations: [
    { rank: 1, name: "Cabai Rawit", emoji: "🌶️", score: 89, riskLevel: "Rendah", estimatedHarvest: "120 hr", estimatedProfit: "Rp 14 Jt" },
    { rank: 2, name: "Jagung Manis", emoji: "🌽", score: 77, riskLevel: "Sedang", estimatedHarvest: "90 hr", estimatedProfit: "Rp 11 Jt" },
    { rank: 3, name: "Kacang Tanah", emoji: "🥜", score: 68, riskLevel: "Rendah", estimatedHarvest: "100 hr", estimatedProfit: "Rp 8 Jt" },
  ],
  topRecommendation: { rank: 1, name: "Cabai Rawit", emoji: "🌶️", score: 89, riskLevel: "Rendah", estimatedHarvest: "120 hr", estimatedProfit: "Rp 14 Jt" },
  reasoning: "Cabai direkomendasikan karena musim kemarau memberikan kondisi optimal untuk pertumbuhan. Tanah lempung pada lahan Anda memiliki drainase yang baik dan dapat menyimpan kelembaban yang cukup. Hasil analisis menunjukkan tingkat kecocokan 89% — tertinggi dari seluruh komoditas yang dianalisis.",
  confidenceScore: 89,
  risks: [
    { label: "Curah Hujan", level: "Rendah", emoji: "🌧️" },
    { label: "Hama & Penyakit", level: "Sedang", emoji: "🦟" },
    { label: "Ketersediaan Air", level: "Rendah", emoji: "💧" },
    { label: "Fluktuasi Harga", level: "Tinggi", emoji: "📈" },
  ],
  radarData: [
    { label: "Kecocokan Tanah", crop1: 92, crop2: 78 },
    { label: "Cuaca", crop1: 88, crop2: 80 },
    { label: "Ketersediaan Air", crop1: 82, crop2: 86 },
    { label: "Potensi Profit", crop1: 90, crop2: 74 },
    { label: "Kemudahan Tanam", crop1: 75, crop2: 88 },
    { label: "Risiko Rendah", crop1: 85, crop2: 79 },
  ],
  createdAt: "2025-08-14T09:41:00",
};

export const mockAnalysisHistory: AnalysisHistory[] = [
  {
    id: "hist_001",
    lahanId: "lhn_001", // ✅
    crop: "Cabai Rawit",
    cropEmoji: "🌶️",
    lahanName: "Lahan Utara A",
    location: "Jepara Utara",
    area: 0.8,
    soilType: "Lempung",
    score: 89,
    date: "14 Agustus 2025 · 09:41",
    summary: "AI merekomendasikan cabai rawit sebagai tanaman terbaik untuk musim kemarau. Tingkat kecocokan sangat tinggi berdasarkan kondisi tanah dan cuaca.",
    tags: [
      { label: "✓ Musim Kemarau", variant: "green" },
      { label: "⚠ Risiko Harga", variant: "amber" },
      { label: "💰 Profit Rp14 Jt/Ha", variant: "blue" },
    ],
    dotBg: "#fee2e2",
  },
  {
    id: "hist_002",
    lahanId: "lhn_002", // ✅
    crop: "Jagung Manis",
    cropEmoji: "🌽",
    lahanName: "Lahan Barat B",
    location: "Jepara Barat",
    area: 1.0,
    soilType: "Aluvial",
    score: 82,
    date: "12 Agustus 2025 · 14:22",
    summary: "Jagung manis cocok untuk lahan aluvial dengan ketersediaan air yang cukup. Potensi hasil panen 8–10 kwintal per hektar.",
    tags: [
      { label: "✓ Tanah Cocok", variant: "green" },
      { label: "💰 Profit Rp11 Jt/Ha", variant: "blue" },
    ],
    dotBg: "#fef3c7",
  },
  {
    id: "hist_003",
    lahanId: "lhn_003", // ✅
    crop: "Kangkung Darat",
    cropEmoji: "🥬",
    lahanName: "Lahan Selatan C",
    location: "Jepara Selatan",
    area: 0.9,
    soilType: "Pasir",
    score: 71,
    date: "10 Agustus 2025 · 08:05",
    summary: "Skor sedang — kangkung masih memungkinkan namun memerlukan tambahan pupuk organik. Perhatikan ketersediaan air yang terbatas.",
    tags: [
      { label: "⚠ Perlu Pupuk", variant: "amber" },
      { label: "⚠ Air Terbatas", variant: "red" },
    ],
    dotBg: "#dcfce7",
  },
  {
    id: "hist_004",
    lahanId: "lhn_004", // ✅
    crop: "Tomat Cherry",
    cropEmoji: "🍅",
    lahanName: "Lahan Timur D",
    location: "Jepara Timur",
    area: 0.5,
    soilType: "Lempung",
    score: 68,
    date: "8 Agustus 2025 · 16:30",
    summary: "Tomat cherry layak dengan perawatan intensif. Harga jual premium namun memerlukan irigasi teratur dan pengendalian hama.",
    tags: [
      { label: "💰 Harga Premium", variant: "blue" },
      { label: "⚠ Perawatan Intensif", variant: "red" },
    ],
    dotBg: "#dbeafe",
  },
];

export const mockCommodityPrices: CommodityPrice[] = [
  { id: "com_001", name: "Cabai Rawit", emoji: "🌶️", category: "Cabai-Sayuran", price: 45000, change: 3200, changePercent7d: 7.6, unit: "kg", trend: "up", updatedAt: "15 Agu 2025, 08:00" },
  { id: "com_002", name: "Jagung Manis", emoji: "🌽", category: "Biji-bijian", price: 5800, change: -200, changePercent7d: -3.3, unit: "kg", trend: "down", updatedAt: "15 Agu 2025, 08:00" },
  { id: "com_003", name: "Padi IR64", emoji: "🌾", category: "Padi-Serealia", price: 5200, change: 100, changePercent7d: 1.9, unit: "kg", trend: "up", updatedAt: "15 Agu 2025, 08:00" },
  { id: "com_004", name: "Kacang Tanah", emoji: "🥜", category: "Kacang-kacangan", price: 18500, change: -300, changePercent7d: -1.6, unit: "kg", trend: "down", updatedAt: "15 Agu 2025, 08:00" },
  { id: "com_005", name: "Kangkung", emoji: "🥬", category: "Sayuran Hijau", price: 3000, change: 200, changePercent7d: 7.1, unit: "ikat", trend: "up", updatedAt: "15 Agu 2025, 08:00" },
  { id: "com_006", name: "Tomat", emoji: "🍅", category: "Sayuran Buah", price: 8500, change: -500, changePercent7d: -5.6, unit: "kg", trend: "down", updatedAt: "15 Agu 2025, 08:00" },
];

const genPriceData = (base: number, volatility: number) =>
  Array.from({ length: 10 }, () => Math.round(base + (Math.random() - 0.5) * volatility * 2));

export const mockPriceTrend: PriceTrendData[] = Array.from({ length: 10 }, (_, i) => ({
  date: `${i * 3 + 1}/8`,
  cabai: genPriceData(42000, 5000)[i],
  jagung: genPriceData(5800, 800)[i],
  padi: genPriceData(5200, 300)[i],
}));

export const mockCalendarEvents: CalendarEvent[] = [
  { id: "ev_001", title: "Tanam Cabai — Lahan A", date: "16 Agustus 2025", type: "tanam", emoji: "🌶️", color: "#1d9a4e", lahanName: "Lahan A" },
  { id: "ev_002", title: "Panen Jagung — Lahan B", date: "22 Agustus 2025", type: "panen", emoji: "🌽", color: "#d97706", lahanName: "Lahan B" },
  { id: "ev_003", title: "Irigasi Lahan C", date: "25 Agustus 2025", type: "irigasi", emoji: "💧", color: "#2563eb", lahanName: "Lahan C" },
  { id: "ev_004", title: "Semai Bibit — Lahan D", date: "28 Agustus 2025", type: "semai", emoji: "🌱", color: "#1d9a4e", lahanName: "Lahan D" },
];

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

export const mockPreferences: AppPreferences = {
  darkMode: false,
  pushNotifications: true,
  autoAnalysis: true,
  realtimePriceUpdate: false,
};

export const mockProfitCompare = [
  { crop: "🌶️ Cabai", profit: 14, color: "rgba(29,154,78,0.8)" },
  { crop: "🌽 Jagung", profit: 11, color: "rgba(217,119,6,0.8)" },
  { crop: "🥜 Kacang", profit: 8, color: "rgba(37,99,235,0.8)" },
];