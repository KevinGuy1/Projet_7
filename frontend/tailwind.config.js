/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#fd2d01',
        'secondary': '#FFD7D7',
        'tertiary': '#4E5166',
        'white': '#FFFFFF',
        'black': '#282828',
        'red': '#FF0000',
        'green': '#1AC100',
        'current': 'currentColor',
      },
      fontFamily: {
        'sans': ['Lato', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [],
}
