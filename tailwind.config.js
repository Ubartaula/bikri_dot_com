/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/public/nepal.webp')",
        hero1: "url('/public/ktm.jpeg')",
      },
      screens: {
        xsm: "540px",
        xxsm: "420px",
      },
    },
  },
  plugins: [],
};
