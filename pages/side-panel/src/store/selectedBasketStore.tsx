import type { BasketResponse } from "@/@types/basket";
import { create } from "zustand";

interface SelectedBasketStore {
  selectedBasket: BasketResponse | null;
  setSelectedBasket: (selectedBasket: BasketResponse | null) => void;
}

export const useSelectedBasketStore = create<SelectedBasketStore>((set) => ({
  selectedBasket: null,
  setSelectedBasket: (selectedBasket) => set({ selectedBasket }),
}));
