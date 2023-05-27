/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '320px',
      'md': '640px',
      'lg': '960px',
      'xlg': '1280px'
    },
    extend: {
      
    },
  },
  plugins: [],
}