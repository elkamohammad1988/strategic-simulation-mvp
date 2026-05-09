import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        border: "hsl(220 13% 91%)",
        input: "hsl(220 13% 91%)",
        ring: "hsl(243 75% 59%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(224 71% 4%)",
        muted: {
          DEFAULT: "hsl(220 14% 96%)",
          foreground: "hsl(220 9% 46%)",
        },
        primary: {
          DEFAULT: "hsl(243 75% 59%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(220 14% 96%)",
          foreground: "hsl(224 71% 4%)",
        },
        accent: {
          DEFAULT: "hsl(243 100% 97%)",
          foreground: "hsl(243 75% 35%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        success: {
          DEFAULT: "hsl(142 71% 45%)",
          foreground: "hsl(0 0% 100%)",
        },
        warning: {
          DEFAULT: "hsl(38 92% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
        chart: {
          1: "hsl(243 75% 59%)",
          2: "hsl(173 58% 39%)",
          3: "hsl(38 92% 50%)",
          4: "hsl(326 78% 60%)",
          5: "hsl(199 89% 48%)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.375rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
