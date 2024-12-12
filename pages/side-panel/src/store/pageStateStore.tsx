import { PageState } from "@/@types/page";
import { create } from "zustand";

type PageStateStore = {
  pageState: PageState;
  setPageState: (pageState: PageState) => void;
};

export const usePageState = create<PageStateStore>((set) => ({
  pageState: PageState.LOGIN,
  setPageState: (pageState) => set({ pageState }),
}));
