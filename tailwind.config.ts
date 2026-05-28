import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0056B3",
        accent: "#0078D4",
        "text-title": "#111827",
        "text-body": "#4B5563",
        "text-sub": "#9CA3AF",
        "bg-page": "#FFFFFF",
        "bg-section": "#F7F8FA",
        "bg-card": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          xl: "1280px",
        },
      },
    },
  },
  plugins: [],
};

export default config;
