import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#080d1b",
        panel: "#111a2c",
        line: "#263248",
        gold: "#f4bd35",
        mint: "#71dfb5",
      },
      boxShadow: {
        gold: "0 12px 36px rgba(244, 189, 53, 0.16)",
      },
    },
  },
  plugins: [],
};

export default config;
