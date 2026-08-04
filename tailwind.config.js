/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      /* ============================= */
      /* Colors (Wedding Theme)        */
      /* ============================= */
      colors: {
        wedding: {
          pink: "rgb(var(--theme-pink) / <alpha-value>)",
          pinkSoft: "rgb(var(--theme-pink-soft) / <alpha-value>)",
          pinkLine: "rgb(var(--theme-pink-line) / <alpha-value>)",
          heart: "rgb(var(--theme-heart) / <alpha-value>)",
          frame: "rgb(var(--theme-frame) / <alpha-value>)",

          textPrimary: "rgb(var(--theme-text-primary) / <alpha-value>)",
          textSecondary: "rgb(var(--theme-text-secondary) / <alpha-value>)",
          textMuted: "rgb(var(--theme-text-muted) / <alpha-value>)",

          bg: "rgb(var(--theme-bg) / <alpha-value>)",
          surface: "rgb(var(--theme-surface) / <alpha-value>)",
        },
      },

      /* ============================= */
      /* Typography                    */
      /* ============================= */
      fontFamily: {
        serif: ['"TMoneyDungunbaram"', "sans-serif"],
        sans: ['"TMoneyDungunbaram"', '"Noto Sans KR"', "sans-serif"],
      },

      /* ============================= */
      /* Shadow (Card 중심)            */
      /* ============================= */
      boxShadow: {
        card: "var(--theme-shadow-card)",
        soft: "var(--theme-shadow-soft)",
      },

      /* ============================= */
      /* Radius (Rounded Wedding UI)   */
      /* ============================= */
      borderRadius: {
        xl2: "1.25rem", // 20px
        xl3: "1.5rem", // 24px
      },

      /* ============================= */
      /* Spacing / Touch Target        */
      /* ============================= */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [],
};
