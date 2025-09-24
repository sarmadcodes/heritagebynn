/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'champagne': {
          50: '#FAF8F5',
          100: '#F4E4BC',
          200: '#F0D89E',
          300: '#EBCC80',
          400: '#E6BF62',
          500: '#E1B344',
          600: '#C4941A',
          700: '#9A7515',
          800: '#6F5510',
          900: '#45360A',
        },
        'blush-pink': {
          50: '#FDF2F8',
          100: '#FCE7F3',
          200: '#FBCFE8',
          300: '#F9A8D4',
          400: '#F472B6',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
        },
        'beige': {
          50: '#FDFDF9',
          100: '#F5F5DC',
          200: '#F0F0D0',
          300: '#EBEBC4',
          400: '#E6E6B8',
          500: '#E1E1AC',
          600: '#D4D49F',
          700: '#C7C793',
          800: '#BABA86',
          900: '#ADAD7A',
        }
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      aspectRatio: {
        '4/5': '4 / 5',
        '3/4': '3 / 4',
      }
    },
  },
  plugins: [],
};