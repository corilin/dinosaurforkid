/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dino-pink': '#FFC1CC',
        'dino-purple': '#D4C4FB',
        'dino-green': '#B8E8D8',
        'dino-teal': '#A0E7E5',
        'dino-yellow': '#FBE7C6',
      },
      fontFamily: {
        'bubblegm': ['"Bubblegum Sans"', 'cursive'],
        'fredoka': ['"Fredoka"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
