/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.js"
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1a365d',
        'brand-red': '#e11d48',
        'brand-gold': '#f59e0b',
        'brand-dark': '#0f172a',
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
