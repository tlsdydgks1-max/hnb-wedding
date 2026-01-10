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
          pink: "#E8AEBF",
          pinkSoft: "#FEF7F9",
          pinkLine: "#F3C6D3",

          textPrimary: "#333333",
          textSecondary: "#666666",
          textMuted: "#999999",

          bg: "#FDFCFC",
        },
      },

      /* ============================= */
      /* Typography                    */
      /* ============================= */
      fontFamily: {
        serif: ['"Nunito"', "sans-serif"],
        sans: ['"Noto Sans KR"', "sans-serif"],
      },

      /* ============================= */
      /* Shadow (Card 중심)            */
      /* ============================= */
      boxShadow: {
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        soft: "0 2px 12px rgba(0, 0, 0, 0.05)",
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
