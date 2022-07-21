/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    fontFamily: {
      sans: ["'Poppins'", "sans-serif"],
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },

    container: {
      center: true,
      padding: "25px",
    },
    extend: {
      colors: {
        brand: "#110E21",
      },
    },
  },
  plugins: [],
}
