import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,  // Disable sourcemaps for production builds
  },
  css: {
    devSourcemap: false, // Disable CSS sourcemaps in development
  },
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // Your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Rewrite if necessary
      }
    },
    historyApiFallback: true,  // Add this line to handle SPA routing
  },
  hmr: {
    overlay: false
  }
});
