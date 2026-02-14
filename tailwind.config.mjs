/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./app/**/*.{js,mjs,jsx,tsx,mdx}', './components/**/*.{js,mjs,jsx,tsx,mdx}', './src/components/**/*.{js,mjs,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F7',
        milk: '#F4F1EC',
        beige: '#EAE3D9',
        graphite: '#2B2B2B',
        ink: '#1F1F1F',
        accent: '#C6A46C',
        terracotta: '#C47A5A',
      },
      boxShadow: {
        soft: '0 12px 30px rgba(43,43,43,0.08)',
        button: '0 8px 22px rgba(198,164,108,0.28)',
      },
      backgroundImage: {
        'section-warm': 'linear-gradient(180deg, #FAF9F7 0%, #F1ECE6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
