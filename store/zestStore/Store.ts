import { create } from "zustand";

interface UserStore {
  name: string;
  email: string;
  profile: string;
  id: string;
  setUser: (user: Partial<UserStore>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  name: "",
  email: "",
  profile: "",
  id: "",
  setUser: (user) => set((state) => ({ ...state, ...user })),
  clearUser: () => set({ name: "", email: "", profile: "", id: "" }),
}));