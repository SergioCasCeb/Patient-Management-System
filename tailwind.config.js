/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'light': '#FAFAFA',
      'dark': '#1D1D1D',
      'primary': '#A3DADE',
      'secondary': {
        '200': '#FFDABC',
        '400': '#FBCCA7',
        '600': '#F1BA8F'
      },
      'transparent': 'transparent',
      'gray':'#767676',
      'gray-blue': '#BDCCCD'
    },
    fontFamily: {
      primary: ['Montserrat', 'sans-serif'],
      secondary: ['Open Sans', 'sans-serif'],
    },
    minWidth: {
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '2/3': '66%',
      '3/4': '75%',
      'full': '100%',
    },
    extend: {},
  },
  plugins: [],
}


