import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        norte: {
          blue: '#020617', 
          gold: '#FFD700', 
          gray: '#94a3b8', 
          'blue-light': '#1e293b',
        }
      },
      // --- ADICIONE DAQUI PARA BAIXO ---
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      }
      // --- ATÉ AQUI ---
    },
  },
  plugins: [],
};
export default config;