# LadangNusa — AI Smart Farming

Platform pertanian cerdas berbasis AI dibangun dengan **Next.js 14 App Router**, **TypeScript**, dan **Tailwind CSS**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.local.example .env.local
# Edit .env.local sesuai backend Anda
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Folder

```
ladangnusa/
├── app/
│   ├── layout.tsx                  # Root layout + metadata SEO
│   ├── page.tsx                    # Redirect → /dashboard
│   ├── globals.css                 # CSS variables + custom styles
│   └── (app)/                      # Route group dengan layout
│       ├── layout.tsx              # Sidebar + Topbar + MobileNav
│       ├── dashboard/page.tsx      # Halaman Dashboard
│       ├── lahan/page.tsx          # Halaman Lahan Saya
│       ├── analisis/page.tsx       # Halaman Analisis AI
│       ├── riwayat/page.tsx        # Halaman Riwayat Analisis
│       ├── kalender/page.tsx       # Halaman Kalender Tanam
│       ├── harga/page.tsx          # Halaman Harga Pasar
│       ├── artikel/page.tsx        # Halaman Artikel Pertanian
│       └── pengaturan/page.tsx     # Halaman Pengaturan
│
├── components/
│   ├── index.ts                    # Barrel exports
│   ├── layout/
│   │   ├── Sidebar.tsx             # Sidebar navigasi
│   │   ├── Topbar.tsx              # Header bar
│   │   └── MobileNav.tsx          # Bottom nav mobile
│   ├── ui/
│   │   ├── PageHeader.tsx          # Judul halaman reusable
│   │   ├── ScorePill.tsx           # Badge skor AI
│   │   ├── ScoreBar.tsx            # Progress bar kesuburan
│   │   ├── RiskBadge.tsx           # Badge level risiko
│   │   ├── FilterChip.tsx          # Filter chip + group
│   │   ├── ToggleSwitch.tsx        # Toggle switch
│   │   └── Modal.tsx               # Modal reusable
│   ├── charts/
│   │   └── Charts.tsx              # Semua chart recharts
│   ├── dashboard/
│   │   ├── StatCard.tsx            # Kartu statistik
│   │   ├── AIInsightCard.tsx       # Kartu insight AI
│   │   └── RecentAnalysis.tsx     # Daftar analisis terbaru
│   ├── lahan/
│   │   ├── LahanCard.tsx           # Kartu lahan
│   │   └── AddLahanModal.tsx       # Modal tambah lahan (3-step)
│   ├── analisis/
│   │   ├── HeroRecCard.tsx         # Kartu rekomendasi utama
│   │   └── RecRankCard.tsx         # Kartu rank rekomendasi
│   ├── riwayat/
│   │   └── TimelineItem.tsx        # Item timeline riwayat
│   ├── kalender/
│   │   └── Calendar.tsx            # Komponen kalender
│   ├── harga/
│   │   └── MarketTable.tsx         # Tabel harga pasar
│   └── artikel/
│       └── ArticleCard.tsx         # Kartu artikel
│
├── hooks/
│   └── useSidebar.ts               # State sidebar mobile
│
├── providers/
│   └── ThemeProvider.tsx           # Dark/light mode context
│
├── services/                       # API service layer
│   ├── lahanService.ts
│   ├── analisisService.ts
│   ├── hargaService.ts
│   └── artikelService.ts
│
├── lib/
│   ├── api.ts                      # Axios wrapper
│   └── utils.ts                    # cn(), formatCurrency(), dll
│
├── types/
│   └── index.ts                    # Semua TypeScript types
│
├── data/
│   └── mockData.ts                 # Semua data dummy
│
└── .env.local.example              # Template environment
```

---

## 🔌 Integrasi API Backend

### Langkah 1: Set Environment
```env
NEXT_PUBLIC_API_BASE_URL=https://api.ladangnusa.id/v1
```

### Langkah 2: Disable Mock Mode
Di setiap service file, ubah:
```ts
const USE_MOCK = true;  // ← ubah ke false
```

### Langkah 3: Sesuaikan Response Shape
Jika response backend berbeda, sesuaikan di `services/*.ts`:
```ts
// Contoh custom response parsing
async getAll(): Promise<Lahan[]> {
  const res = await get<{ items: Lahan[]; meta: any }>("/lahan");
  return res.items; // sesuaikan dengan struktur backend
}
```

---

## 📦 Dependencies Utama

| Package | Kegunaan |
|---------|----------|
| `next@14` | Framework React SSR/SSG |
| `react-hook-form` | Form management |
| `recharts` | Chart library React |
| `axios` | HTTP client |
| `clsx` + `tailwind-merge` | Class name utilities |

---

## 🎨 Theming

CSS variables didefinisikan di `app/globals.css`. Dark mode toggle tersimpan di `localStorage` via `ThemeProvider`.

```css
/* Tambah warna baru di globals.css */
:root {
  --my-color: #ff6b35;
}
[data-theme="dark"] {
  --my-color: #ff9a70;
}
```

---

## ✅ Checklist API Integration

- [ ] Set `NEXT_PUBLIC_API_BASE_URL` di `.env.local`
- [ ] Set `USE_MOCK = false` di semua service
- [ ] Tambah auth token handling di `lib/api.ts`
- [ ] Sesuaikan TypeScript types di `types/index.ts`
- [ ] Tambah error boundary per halaman
- [ ] Implementasi loading skeleton
- [ ] Setup React Query atau SWR untuk caching

---

## 🏗️ Build Production

```bash
npm run build
npm start
```
