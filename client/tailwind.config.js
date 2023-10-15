/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        'sm': '0 10px 10px rgb(94, 92, 92)',
      }
    },
  },
  plugins: [],
}