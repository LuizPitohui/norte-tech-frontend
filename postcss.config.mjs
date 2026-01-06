/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // <--- Voltamos para o nome simples
    autoprefixer: {},
  },
};

export default config;