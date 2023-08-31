/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#077782",
      },
      fontFamily: {
        chewy: ["Chewy", "cursive"],
      },
    },
  },
  plugins: [],
};
