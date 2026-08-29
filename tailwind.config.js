/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          bg: '#FFFDF9',
          card: '#FFF9F3',
          cardHover: '#FDF2E9',
          pink: '#F8E7E7',
          pinkHover: '#F2D5D5',
          sage: '#E4ECE7',
          sageHover: '#D4E2DA',
          rose: '#E6C5C8',
          accent: '#D99B9B',
          text: '#4A3B32',
          muted: '#8C7A70',
          border: '#EFE5DD',
          yellow: '#FCF5E5',
          lavender: '#EFEBF5',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
