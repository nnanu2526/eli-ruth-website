/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#ecf5ff',
          100: '#d7eaff',
          200: '#b5d7ff',
          300: '#8bbcfe',
          400: '#5d9bfb',
          500: '#3B82F6',
          600: '#2f67c5',
          700: '#284fa0',
          800: '#223f80',
          900: '#1d356a',
        },
      },
    },
  },
  plugins: [],
}
