const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

// ── Token helpers ──
export const getToken = (): string | null =>
  typeof window !== 'undefined' ? localStorage.getItem('ladangnusa_token') : null;

export const setToken = (token: string) =>
  localStorage.setItem('ladangnusa_token', token);

export const removeToken = () =>
  localStorage.removeItem('ladangnusa_token');

// ── Base fetcher ──
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    // Kalau 401 — token expired, clear dan redirect ke login
    if (res.status === 401 && typeof window !== 'undefined') {
      removeToken();
      window.location.href = '/login';
    }
    throw new ApiError(data.message ?? 'Terjadi kesalahan.', res.status, data.errors);
  }

  return data;
}

// ── Custom error class ──
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  // Ambil pesan error pertama dari validation errors
  firstError(): string {
    if (!this.errors) return this.message;
    const first = Object.values(this.errors)[0];
    return first?.[0] ?? this.message;
  }
}

// ── Auth ──
export const authApi = {
  register: (data: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
    location?: string;
  }) => request<{ success: boolean; data: { token: string; user: User } }>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (data: { email: string; password: string }) =>
    request<{ success: boolean; data: { token: string; user: User } }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  logout: () =>
    request<{ success: boolean }>('/auth/logout', { method: 'POST' }),

  me: () =>
    request<{ success: boolean; data: User }>('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    request<{ success: boolean; data: User }>('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (data: {
    current_password: string;
    password: string;
    password_confirmation: string;
  }) =>
    request<{ success: boolean; message: string }>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// ── Lahan ──
export const lahanApi = {
  list: () =>
    request<{ success: boolean; data: { lahan: Lahan[]; stats: LahanStats } }>('/lahan'),

  get: (id: string) =>
    request<{ success: boolean; data: Lahan }>(`/lahan/${id}`),

  create: (data: FormData) =>
    fetch(`${BASE_URL}/lahan`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      },
      body: data, // FormData untuk support upload foto
    }).then(r => r.json()),

  update: (id: string, data: FormData) => {
    const numericId = id.replace(/^lhn_0*/, "");

    // Convert FormData ke plain object untuk dikirim sebagai JSON
    const body: Record<string, any> = {};
    data.forEach((value, key) => {
      if (key !== "_method") body[key] = value;
    });

    return request<{ success: boolean; data: Lahan; message?: string }>(
      `/lahan/${numericId}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
      }
    );
  },

  delete: (id: string) =>
    request<{ success: boolean; message: string }>(`/lahan/${id}`, { method: 'DELETE' }),
};

// ── Analisis ──
export const analisisApi = {
  run: (lahanId: number) =>
    request<{ success: boolean; data: AnalysisResult }>('/analisis', {
      method: 'POST',
      body: JSON.stringify({ lahan_id: lahanId }),
    }),

  list: () =>
    request<{ success: boolean; data: AnalysisHistory[] }>('/analisis'),

  get: (id: string) =>
    request<{ success: boolean; data: AnalysisResult }>(`/analisis/${id}`),
};

// ── Kalender ──
export const kalenderApi = {
  list: (params?: { bulan?: number; tahun?: number }) => {
    const qs = params ? '?' + new URLSearchParams(params as any).toString() : '';
    return request<{ success: boolean; data: CalendarEvent[] }>(`/kalender${qs}`);
  },

  create: (data: {
    lahan_id?: number;
    title: string;
    date: string;
    type: string;
    notes?: string;
  }) =>
    request<{ success: boolean; data: CalendarEvent }>('/kalender', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: Partial<CalendarEvent>) =>
    request<{ success: boolean; data: CalendarEvent }>(`/kalender/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    request<{ success: boolean }>(`/kalender/${id}`, { method: 'DELETE' }),
};

// ── Harga ──
export const hargaApi = {
  list: () =>
    request<{ success: boolean; data: CommodityPrice[]; source: string }>('/harga'),

  trend: (slug: string) =>
    request<{ success: boolean; data: any }>(`/harga/${slug}`),
};

// ── Cuaca ──
export const cuacaApi = {
  get: (lokasi: string) =>
    request<{ success: boolean; data: any }>(`/cuaca?lokasi=${encodeURIComponent(lokasi)}`),
};

// ── Dashboard ──
export const dashboardApi = {
  stats: () =>
    request<{ success: boolean; data: DashboardStats }>('/dashboard/stats'),

  recentAnalysis: () =>
    request<{ success: boolean; data: AnalysisHistory[] }>('/dashboard/recent-analysis'),

  upcomingEvents: () =>
    request<{ success: boolean; data: CalendarEvent[] }>('/dashboard/upcoming-events'),
};

// ── Types (ringkas, sesuai response Laravel) ──
export interface User {
  id: number;
  name: string;
  initials: string;
  email: string;
  phone: string;
  role: string;
  location: string;
}

export interface Lahan {
  id: string;
  name: string;
  location: string;
  area: number;
  soilType: string;
  waterAvailability: string;
  status: string;
  fertility: number;
  emoji: string;
  bgColor: string;
  lastCrop: string;
  lastCropAgo: string;
  createdAt: string;
}

export interface LahanStats {
  total: number;
  total_area: number;
  active: number;
}

export interface AnalysisResult {
  id: string;
  lahanId: string;
  lahanName: string;
  recommendations: any[];
  topRecommendation: any;
  reasoning: string;
  confidenceScore: number;
  risks: any[];
  radarData: any[];
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
  tags: any[];
  dotBg: string;
}

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

export interface CommodityPrice {
  id: string;
  name: string;
  emoji: string;
  category: string;
  price: number;
  change: number;
  changePercent7d: number;
  unit: string;
  trend: string;
  updatedAt: string;
}

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

export const chatApi = {
  send: (message: string, history: { role: "user" | "model"; content: string }[]) =>
    request<{
      success: boolean;
      data: {
        reply: string;
        route: { path: string; label: string } | null;
      };
    }>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    }),
};