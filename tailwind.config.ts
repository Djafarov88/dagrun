import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        asphalt: "#2b2b2b",
        signal: "#f25f3a",
        track: "#f5f2ec",
        mist: "#e7ecef",
        pine: "#1f4d3a"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgb(21 21 21 / 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
