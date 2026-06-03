import { get } from "@/lib/api";
import type { ApiResponse, Article, PaginatedResponse } from "@/types";
import { mockArticles } from "@/data/mockData";
import { delay } from "@/lib/utils";

const USE_MOCK = true;

export const artikelService = {
  async getAll(page = 1, perPage = 12): Promise<PaginatedResponse<Article>> {
    if (USE_MOCK) {
      await delay(300);
      return {
        data: mockArticles,
        total: mockArticles.length,
        page,
        perPage,
        totalPages: 1,
      };
    }
    const res = await get<PaginatedResponse<Article>>(`/artikel?page=${page}&perPage=${perPage}`);
    return res;
  },

  async getById(id: string): Promise<Article> {
    if (USE_MOCK) {
      await delay(200);
      const item = mockArticles.find((a) => a.id === id);
      if (!item) throw new Error("Artikel tidak ditemukan");
      return item;
    }
    const res = await get<ApiResponse<Article>>(`/artikel/${id}`);
    return res.data;
  },
};
