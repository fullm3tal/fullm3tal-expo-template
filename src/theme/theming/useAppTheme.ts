import { create } from "zustand";
import { ColorScheme, ColorTheme } from "../tokens/color";

interface ThemeProps {
  colorScheme?: ColorScheme;
  colorTheme?: ColorTheme;
  changeColorScheme: (colorScheme: ColorScheme) => void;
  changeColorTheme: (colorTheme: ColorTheme) => void;
}

export const useAppTheme = create<ThemeProps>((set) => ({
  colorScheme: "light",
  colorTheme: "blue",
  changeColorScheme: (colorScheme) => set({ colorScheme }),
  changeColorTheme: (colorTheme) => set({ colorTheme }),
}));
