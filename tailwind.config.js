/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFBF7',
        botanical: '#2D5A27',
        moss: '#63824A',
        earth: '#8B5A2B',
        ink: '#1A1A1A',
        clay: '#C89461',
        oat: '#F3EBDD',
        sage: '#DDE8D5'
      },
      boxShadow: {
        soft: '0 18px 45px rgba(45, 90, 39, 0.10)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
