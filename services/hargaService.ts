import { get } from "@/lib/api";
import type { ApiResponse, CommodityPrice, PriceTrendData } from "@/types";
import { mockCommodityPrices, mockPriceTrend } from "@/data/mockData";
import { delay } from "@/lib/utils";

const USE_MOCK = true;

export const hargaService = {
  async getPrices(): Promise<CommodityPrice[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockCommodityPrices;
    }
    const res = await get<ApiResponse<CommodityPrice[]>>("/harga/today");
    return res.data;
  },

  async getTrend(days = 30): Promise<PriceTrendData[]> {
    if (USE_MOCK) {
      await delay(400);
      return mockPriceTrend;
    }
    const res = await get<ApiResponse<PriceTrendData[]>>(`/harga/trend?days=${days}`);
    return res.data;
  },
};
