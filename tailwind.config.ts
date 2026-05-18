import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#EEF0F6",
          100: "#D5DAE8",
          200: "#ABB5D1",
          300: "#8190BA",
          400: "#576BA3",
          500: "#3A4F7A",
          600: "#2D3D5E",
          700: "#1B2A4A",
          800: "#141F37",
          900: "#0F1B33",
          950: "#080D1A",
        },
        gold: {
          50: "#FBF7EC",
          100: "#F5EBD0",
          200: "#EBD7A1",
          300: "#E0C372",
          400: "#D4AD4B",
          500: "#C9A84C",
          600: "#A8893A",
          700: "#7E672C",
          800: "#55451D",
          900: "#2B230F",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
