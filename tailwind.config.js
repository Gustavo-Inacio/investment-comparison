// Em tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...outras configurações (darkMode, content, etc.)
  theme: {
    extend: {
      fontFamily: {
        // Define 'Roboto' como a fonte principal
        // '...fontFamily.sans' adiciona as fontes padrão do Tailwind
        // como fallbacks (ex: system-ui, etc.)
        sans: ['Roboto', ...fontFamily.sans],
      },
      // ...outras extensões do tema
    },
  },
  plugins: [
    // ...seus plugins
  ],
};