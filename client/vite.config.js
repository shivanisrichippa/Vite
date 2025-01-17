import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
    devSourcemap: false, // Ensure this is within the css object
  },
  build: {
    sourcemap: false, // Ensure this is within the build object
  },
  server:{port:5173}
});
