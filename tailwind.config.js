/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Si tu as un fichier HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Scanne tous les fichiers JS, TS, JSX, et TSX dans src
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      keyframes: {
        fadeInSlideDown: {
          to: {
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        fadeInSlideDown: 'fadeInSlideDown 2s ease forwards'
      }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
};
