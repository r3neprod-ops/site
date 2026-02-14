import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        graphite: '#0B1020',
        ink: '#111827',
        neon: '#00E5BC',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 12px 40px rgba(0, 229, 188, 0.18)',
      },
      backgroundImage: {
        'premium-gradient': 'radial-gradient(circle at 20% 20%, rgba(0,229,188,0.18), transparent 38%), radial-gradient(circle at 80% 5%, rgba(86,49,255,0.18), transparent 35%), linear-gradient(135deg, #050913 0%, #0c1730 55%, #0b1a22 100%)'
      }
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;
