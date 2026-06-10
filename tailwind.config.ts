import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        serif: ["Fraunces", "serif"],
      },
      colors: {
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          accent: "#1d9a4e",
          light: "#e8f5ec",
        },
        sage: {
          50: "#f6f7f4",
          100: "#eaece5",
          200: "#d4d9cb",
          400: "#9aaa8b",
          600: "#5e7050",
        },
        earth: {
          50: "#faf7f2",
          100: "#f0e9d8",
          200: "#dfd0b0",
          600: "#8b6a3e",
        },
      },
      borderRadius: {
        card: "16px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.04)",
        hover: "0 4px 12px rgba(0,0,0,.1), 0 12px 32px rgba(0,0,0,.06)",
      },
      width: {
        sidebar: "260px",
        "sidebar-sm": "72px",
      },
      height: {
        topbar: "64px",
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
            transform: "scale(1)",
            boxShadow: "0 0 0 0 rgba(74,222,128,.5)",
          },
          "50%": {
            opacity: ".8",
            transform: "scale(1.1)",
            boxShadow: "0 0 0 6px rgba(74,222,128,0)",
          },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
