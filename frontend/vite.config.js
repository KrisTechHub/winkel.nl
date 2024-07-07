// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: './dist',
    rollupOptions: {
      input: './src/index.html', // Ensure this path is correct
    },
  },
  base: '/', // Ensure the base path is set correctly
  server: {
    open: true,
    port: 5173,
    historyApiFallback: true,
  },
  define: {
    'process.env': { ...process.env }, // Make process.env available in Vite
  }
})
