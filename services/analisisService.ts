import { get, post } from "@/lib/api";
import type { ApiResponse, AnalysisResult, AnalysisHistory } from "@/types";
import { mockAnalysisResult, mockAnalysisHistory } from "@/data/mockData";
import { delay } from "@/lib/utils";

const USE_MOCK = true;

export const analisisService = {
  async getResult(lahanId: string): Promise<AnalysisResult> {
    if (USE_MOCK) {
      await delay(800); // simulate AI processing
      return { ...mockAnalysisResult, lahanId };
    }
    const res = await get<ApiResponse<AnalysisResult>>(`/analisis/result/${lahanId}`);
    return res.data;
  },

  async runAnalysis(lahanId: string): Promise<AnalysisResult> {
    if (USE_MOCK) {
      await delay(1500);
      return mockAnalysisResult;
    }
    const res = await post<ApiResponse<AnalysisResult>>(`/analisis/run`, { lahanId });
    return res.data;
  },

  async getHistory(): Promise<AnalysisHistory[]> {
    if (USE_MOCK) {
      await delay(300);
      return mockAnalysisHistory;
    }
    const res = await get<ApiResponse<AnalysisHistory[]>>("/analisis/history");
    return res.data;
  },
};
