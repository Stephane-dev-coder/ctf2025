import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
=======
>>>>>>> parent of ef9ca51 (netlify deploy)
  optimizeDeps: {
    include: ['firebase/app', 'firebase/auth', 'firebase/firestore']
  },
  build: {
<<<<<<< HEAD
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      }
    }
=======
    sourcemap: true
>>>>>>> parent of ef9ca51 (netlify deploy)
  }
});
