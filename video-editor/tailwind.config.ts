import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        editor: {
          bg: "#0a0e1a",
          panel: "#111827",
          border: "#1f2937",
          accent: "#3b82f6",
          text: "#e5e7eb",
          muted: "#9ca3af",
        },
      },
    },
  },
  plugins: [],
};

export default config;
