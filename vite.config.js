import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic'
    })
  ],
  server: {
    port: 5173,
    host: true,
    open: true,
    strictPort: false
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'es2015',
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalizedId = id.replace(/\\/g, '/');
          if (normalizedId.includes('node_modules')) {
            if (
              normalizedId.includes('/node_modules/react/') ||
              normalizedId.includes('/node_modules/react-dom/') ||
              normalizedId.includes('/node_modules/scheduler/') ||
              normalizedId.includes('/node_modules/prop-types/')
            ) {
              return 'vendor-react';
            }
            if (normalizedId.includes('framer-motion')) return 'vendor-framer';
            if (normalizedId.includes('react-icons')) {
              const match = /node_modules[\\/](react-icons[\\/][a-z0-9]+)/.exec(id);
              if (match) return `vendor-icons-${match[1].split(/[\\/]/).pop()}`;
              return 'vendor-icons';
            }
            if (normalizedId.includes('react-github-calendar') || normalizedId.includes('gsap') || normalizedId.includes('@emailjs')) {
              return 'vendor-addons';
            }
            return 'vendor-libs';
          }
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  }
})