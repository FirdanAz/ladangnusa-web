import { get, post, put, del } from "@/lib/api";
import type { ApiResponse, Lahan, LahanFormData, PaginatedResponse } from "@/types";
import { mockLahan } from "@/data/mockData";
import { delay } from "@/lib/utils";

// ─── SET TO false WHEN BACKEND IS READY ───
const USE_MOCK = true;

export const lahanService = {
  async getAll(): Promise<Lahan[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockLahan;
    }
    const res = await get<ApiResponse<Lahan[]>>("/lahan");
    return res.data;
  },

  async getById(id: string): Promise<Lahan> {
    if (USE_MOCK) {
      await delay(200);
      const item = mockLahan.find((l) => l.id === id);
      if (!item) throw new Error("Lahan tidak ditemukan");
      return item;
    }
    const res = await get<ApiResponse<Lahan>>(`/lahan/${id}`);
    return res.data;
  },

  async create(data: LahanFormData): Promise<Lahan> {
    if (USE_MOCK) {
      await delay(500);
      const newLahan: Lahan = {
        id: `lhn_${Date.now()}`,
        name: data.name,
        location: data.location,
        area: data.area,
        soilType: data.soilType,
        waterAvailability: data.waterAvailability,
        status: "aktif",
        fertility: 70,
        emoji: "🌱",
        bgColor: "#e8f5ec",
        lastCrop: data.lastCrop || "-",
        lastCropAgo: "-",
        createdAt: new Date().toISOString(),
      };
      return newLahan;
    }
    const res = await post<ApiResponse<Lahan>, LahanFormData>("/lahan", data);
    return res.data;
  },

  async update(id: string, data: Partial<LahanFormData>): Promise<Lahan> {
    if (USE_MOCK) {
      await delay(400);
      const existing = mockLahan.find((l) => l.id === id);
      if (!existing) throw new Error("Lahan tidak ditemukan");
      return { ...existing, ...data } as Lahan;
    }
    const res = await put<ApiResponse<Lahan>, Partial<LahanFormData>>(`/lahan/${id}`, data);
    return res.data;
  },

  async delete(id: string): Promise<void> {
    if (USE_MOCK) {
      await delay(300);
      return;
    }
    await del(`/lahan/${id}`);
  },
};
