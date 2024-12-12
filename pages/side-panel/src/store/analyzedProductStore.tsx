import type { AnalyzeResponseDto } from "@/@types/product";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AnalyzedProductStore = {
  analyzedProduct: AnalyzeResponseDto | null;
  setAnalyzedProduct: (analyzedProduct: AnalyzeResponseDto) => void;
};

export const useAnalyzedProductStore = create(
  persist<AnalyzedProductStore>(
    (set) => ({
      analyzedProduct: null,
      setAnalyzedProduct: (analyzedProduct) => set({ analyzedProduct }),
    }),
    {
      name: "analyzed-product",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
