import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#37C5CB',
          deepBlue: '#2D589D',
          skyBlue: '#58A8D8',
          midBlue: '#447CBD',
          lightCyan: '#97D9ED',
          paleCyan: '#BAE8F0',
          ink: '#3E4247'
        }
      },
      borderRadius: {
        lg: 'var(--radius)'
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'}
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'}
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #2D589D 0%, #37C5CB 100%)'
      }
    }
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
};

export default config;
