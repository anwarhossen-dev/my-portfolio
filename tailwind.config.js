/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // Sky blue/Cyan as used in components
        secondary: '#d946ef', // Fuschia/Pink for gradients
        'background-light': '#F8FAFC',
        'background-dark': '#0B1121',
        'surface-dark': '#161e32',
        'surface-light': '#ffffff',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right bottom, #0ea5e9, #8b5cf6, #d946ef)',
      }
    },
  },
  plugins: [],
}