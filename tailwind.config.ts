import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        panel: "#161616",
        border: "#2b2b2b",
        text: "#f4f1ea",
        muted: "#b9b5ac",
        accent: "#d9c8a3"
      },
      borderRadius: {
        lg: "0.75rem"
      }
    }
  },
  plugins: []
};

export default config;
