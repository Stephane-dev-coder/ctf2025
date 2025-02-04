/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'scan': 'scan 4s linear infinite',
        'fadeIn': 'fadeIn 2s ease-in',
        'glitch': 'glitch 1s cubic-bezier(.25, .46, .45, .94) infinite both',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' }
        },
        glitch: {
          '0%': { 
            transform: 'translate(0)',
            textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00'
          },
          '15%': { 
            transform: 'translate(-5px, 5px)',
            textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00'
          },
          '30%': { 
            transform: 'translate(5px, -5px)',
            textShadow: '-0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00'
          },
          '45%': { 
            transform: 'translate(-5px, 5px)',
            textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00'
          },
          '60%': { 
            transform: 'translate(5px, -5px)',
            textShadow: '-0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff, -0.05em -0.05em 0 #fffc00'
          },
          '75%': { 
            transform: 'translate(-5px, 5px)',
            textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00'
          },
          '100%': { 
            transform: 'translate(0)',
            textShadow: '0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff, 0.025em 0.04em 0 #fffc00'
          }
        }
      }
    },
  },
  plugins: [],
};
