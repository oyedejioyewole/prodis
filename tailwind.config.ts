import type { Config } from "tailwindcss";

export default {
  content: [],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: "'Vollkorn'",
        sans: "'Quicksand'",
      },
      colors: {
        blurple: "#5865F2",
      },
    },
  },
  plugins: [],
} satisfies Config;
