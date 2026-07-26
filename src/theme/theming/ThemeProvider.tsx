import React from "react";
import { Theme } from "../types";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const value: Theme = {
    dark: false,
    animation: {},
    colors: {},
    fonts: {},
    shapes: {},
    motion: {},
    elevation: {},
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
