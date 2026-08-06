import React from "react";
import { Theme } from "../types";

export const ThemeContext = React.createContext<Theme | null>(null);

ThemeContext.displayName = "ThemeContext";
