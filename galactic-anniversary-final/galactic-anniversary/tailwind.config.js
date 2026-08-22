/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        ui: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      colors: {
        void: '#020214',
        'deep-navy': '#0a0a2e',
        'cosmic-indigo': '#1a1040',
        'star-blue': '#818cf8',
        lavender: '#c4b5fd',
        'star-white': '#f0f4ff',
        'dawn-gold': '#fbbf24',
        'nebula-pink': '#f472b6',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'star-appear': 'starAppear 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          from: { boxShadow: '0 0 8px rgba(129,140,248,0.4)' },
          to: { boxShadow: '0 0 20px rgba(129,140,248,0.8), 0 0 40px rgba(129,140,248,0.3)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        starAppear: {
          from: { opacity: '0', transform: 'scale(0)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
