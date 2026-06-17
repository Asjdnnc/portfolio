import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        soft: "var(--color-soft)",
        accent: "var(--color-accent)",
        line: "var(--color-line)",
        invert: "var(--color-invert)",
        "invert-ink": "var(--color-invert-ink)",
      },
      boxShadow: {
        frame: "0 22px 80px color-mix(in srgb, var(--color-ink) 14%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
