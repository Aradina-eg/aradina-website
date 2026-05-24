/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFFAF8",
          100: "#D5F2ED",
          200: "#ABE5DB",
          300: "#81D8C9",
          400: "#60C0B0",
          500: "#60C0B0",
          600: "#4EA99A",
          700: "#347F74",
          800: "#205A52",
          900: "#0E302C",
          950: "#061A18",
        },
      },
    },
  },
  plugins: [],
}
