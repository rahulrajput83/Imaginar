/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      keyframes: {
        'alert': {
          '0%': {
            transform: 'translateX(100%)'
          },
          '40%': {
            transform: 'translateX(-10%)'
          },
          '80': {
            transform: 'translateX(0%)'
          },
          '100%': {
            tranform: 'translateX(-20px)'
          }
        },
        'inputBox': {
          '0%': {
            transform: 'translateX(0%)'
          },
          '20%': {
            transform: 'translateX(-10%)'
          },
          '40%': {
            transform: 'translateX(0%)'
          },
          '80': {
            transform: 'translateX(20%)'
          },
          '100%': {
            tranform: 'translateX(0%)'
          }
        }
      },
      animation: {
        'alert': 'alert 1s ease forwards',
        'inputBox': 'inputBox 1s ease infinite'
      }
    },
  },
  plugins: [],
}
