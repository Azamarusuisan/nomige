/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#FFD700',
          dark: '#B8960C',
        }
      },
      boxShadow: {
        'glow-gold': '0 0 30px rgba(212, 175, 55, 0.4)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.4)',
        'ios': '0 10px 40px rgba(0, 0, 0, 0.5)',
        'ios-lg': '0 20px 60px rgba(0, 0, 0, 0.6)',
      },
      backdropBlur: {
        'ios': '20px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
