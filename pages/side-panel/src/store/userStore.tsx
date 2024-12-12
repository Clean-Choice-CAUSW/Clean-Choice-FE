import type { User } from "@/@types/auth";
import { create } from "zustand";

type UserStore = {
  user: User | null;
  setUserState: (user: User) => void;
};

const userStore = create<UserStore>((set) => ({
  user: null,
  setUserState: (user) => set({ user }),
}));

export default userStore;
