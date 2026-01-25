import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Production optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'chess-vendor': ['chess.js', 'react-chessboard'],
        },
      },
    },
    // Generate source maps for debugging (optional)
    sourcemap: false,
    // Target modern browsers
    target: 'es2020',
  },
  // Optimize deps
  optimizeDeps: {
    include: ['react', 'react-dom', 'chess.js', 'react-chessboard'],
  },
});
