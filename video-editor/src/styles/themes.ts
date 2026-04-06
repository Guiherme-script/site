import type { Theme } from "../core/types";

export const darkBlueTheme: Theme = {
  name: "Azul Escuro",
  colors: {
    background: "#0a0e1a",
    backgroundAlt: "#111827",
    accent: "#3b82f6",
    accentSecondary: "#8b5cf6",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
  },
  fontFamily: {
    heading: "Space Grotesk, sans-serif",
    body: "Inter, sans-serif",
  },
};

export const warmDarkTheme: Theme = {
  name: "Escuro Quente",
  colors: {
    background: "#1a0e0a",
    backgroundAlt: "#271811",
    accent: "#f59e0b",
    accentSecondary: "#ef4444",
    text: "#fef3c7",
    textMuted: "#d97706",
  },
  fontFamily: {
    heading: "Space Grotesk, sans-serif",
    body: "Inter, sans-serif",
  },
};

export const mintTheme: Theme = {
  name: "Menta",
  colors: {
    background: "#0a1a14",
    backgroundAlt: "#11271e",
    accent: "#10b981",
    accentSecondary: "#06b6d4",
    text: "#ecfdf5",
    textMuted: "#6ee7b7",
  },
  fontFamily: {
    heading: "Space Grotesk, sans-serif",
    body: "Inter, sans-serif",
  },
};

export const themes: Theme[] = [darkBlueTheme, warmDarkTheme, mintTheme];
export const defaultTheme = darkBlueTheme;
