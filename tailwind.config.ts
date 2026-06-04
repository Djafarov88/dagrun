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
        night: "#05060a",
        carbon: "#0d1118",
        steel: "#8a93a3",
        chrome: "#e9edf5",
        gold: "#d7ff35",
        flame: "#ff4f1f",
        ocean: "#00b7ff"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgb(215 255 53 / 0.16)",
        panel: "0 24px 70px rgb(0 0 0 / 0.32)"
      }
    }
  },
  plugins: []
};

export default config;
