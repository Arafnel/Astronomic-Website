export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf7ed',
          100: '#f9e7c4',
          200: '#f3d28a',
          300: '#e9b956',
          400: '#dca337',
          500: '#c58a1f',
          600: '#a06a17',
          700: '#7c4e14',
          800: '#5b3a12',
          900: '#422c0f',
        },
        space: {
          50: '#f0f4ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        cosmic: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        }
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at top, rgba(250, 219, 141, 0.18) 0, transparent 55%), radial-gradient(circle at bottom left, rgba(173, 121, 53, 0.35) 0, transparent 60%), #050611',
        'cosmic-gradient': 'linear-gradient(120deg, #f5d08a 0%, #e3aa57 45%, #c58a1f 100%)',
      }
    },
  },
  plugins: [],
}