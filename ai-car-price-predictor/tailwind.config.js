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
        'bg-primary': '#0B0D0F',
        'bg-card': '#14171A',
        'bg-input': '#1C2024',
        'bg-input-hover': '#252A30',
        'border-primary': '#2A2F35',
        'text-primary': '#F5F5F5',
        'text-secondary': '#8B929A',
        'accent': '#3B82F6',
        'btn-primary': '#2563EB',
        'btn-primary-hover': '#1D4ED8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'h1': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h2': ['24px', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'h3': ['20px', { lineHeight: '1.4' }],
        'body-lg': ['18px', { lineHeight: '1.6' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],
        'caption': ['12px', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'input-focus': '0 0 0 3px rgba(59, 130, 246, 0.3)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  plugins: [],
}