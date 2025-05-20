import { create } from "zustand";

interface UserStore {
  name: string;
  email: string;
  profile: string;
  id: string;
  about: string;
  setUser: (user: Partial<UserStore>) => void;
  clearUser: () => void;
}
// data that Backend
export const useUserStore = create<UserStore>((set) => ({
  name: "",
  email: "",
  profile: "",
  about: "",
  id: "",
  setUser: (user) => set((state) => ({ ...state, ...user })),
  clearUser: () => set({ name: "", email: "", profile: "", id: "" }),
}));
