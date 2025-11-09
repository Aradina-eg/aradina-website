/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F1FBF8",
          100: "#D7F4EC",
          200: "#AFE9DB",
          300: "#86DDCA",
          400: "#63D1BD",
          500: "#8CD9CA",
          600: "#64BEAE",
          700: "#3D8F7B",
          800: "#216354",
          900: "#0E2F29",
        },
      },
    },
  },
  plugins: [],
}
