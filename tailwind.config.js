/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
  safelist: [
    'bg-green-100',
    'bg-blue-100',
    'bg-purple-100',
    'bg-yellow-100',
    'bg-teal-100',
    'text-green-600',
    'text-blue-600',
    'text-purple-600',
    'text-yellow-600',
    'text-teal-600',
  ],
};