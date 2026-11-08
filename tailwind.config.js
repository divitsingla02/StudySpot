/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F9F6',
        charcoal: {
          DEFAULT: '#202820',
          50: '#F4F5F4',
          100: '#E4E7E4',
          200: '#C7CBC7',
          400: '#7B847B',
          600: '#485248',
          700: '#323B32',
          800: '#262F26',
          900: '#202820',
        },
        forest: {
          50: '#F1F7F3',
          100: '#E1EFE6',
          200: '#C4DEC0',
          300: '#9EC8AA',
          400: '#52976D',
          500: '#276749', // primary accent
          600: '#1F543B',
          700: '#17402D',
          800: '#113022',
          900: '#0C2117',
        },
        sage: {
          50: '#F8FAF8',
          100: '#EBF2EB',
          200: '#DAE7DA',
          300: '#BED4BE',
          400: '#92B392',
          500: '#698E69',
          600: '#537553',
        },
        borderLight: '#E8EDE8',
        cardBg: '#FFFFFF',
      },
      borderRadius: {
        'card': '16px',
        'subtle': '14px',
        'pill': '9999px',
      },
      boxShadow: {
        'subtle': '0 2px 8px -2px rgba(32, 40, 32, 0.05)',
        'elevated': '0 8px 24px -4px rgba(32, 40, 32, 0.08), 0 2px 6px -1px rgba(32, 40, 32, 0.03)',
        'modal': '0 20px 40px -10px rgba(32, 40, 32, 0.16), 0 1px 3px rgba(32, 40, 32, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

