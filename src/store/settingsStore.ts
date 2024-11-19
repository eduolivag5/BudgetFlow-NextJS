import { create } from "zustand";
import { persist } from "zustand/middleware";

type CurrencyStore = {
  currency: string; 
  setCurrency: (newCurrency: string) => void; 
};

export const useSettingsStore = create(
  persist<CurrencyStore>(
    (set) => ({
      currency: "€", 
      setCurrency: (newCurrency) => set({ currency: newCurrency }),
    }),
    {
      name: "settings-storage", 
    }
  )
);
