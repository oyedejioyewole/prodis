/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        serif: "'Vollkorn', serif",
        sans: "'Quicksand', sans-serif",
      },
      colors: {
        blurple: "#5865F2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
