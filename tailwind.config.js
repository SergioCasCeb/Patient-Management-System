/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      'light': {
        '400': '#FAFAFA',
        '600': '#F1F1F1'
      },
      'dark': {
        '200': '#A9A9A9',
        '400': '#767676',
        '600': '#4B4B4B',
        '800': '#1D1D1D'
      },
      'primary': {
        '200': '#C2EDF0',
        '400': '#A3DADE',
        '600': '#8EC6CA'
      },
      'secondary': {
        '200': '#FFDABC',
        '400': '#FBCCA7',
        '600': '#F1BA8F'
      },
      'transparent': 'transparent',
      'gray-blue': {
        '200': '#D3E1E2',
        '400': '#BDCCCD',
        '600': '#A0B1B2'
      },
      'success': {
        '400': '#28A745',
        '600': '#208537'
      },
      'warning': {
        '400': '#ffc107',
        '600': '#dda809'
      },
      'danger': {
        '400': '#dc3545',
        '600': '#b32c39'
      }
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
      'fit': 'fit-content'
    },
    extend: {},
  },
  plugins: [],
}


