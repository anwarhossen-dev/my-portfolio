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
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('react-dom')) return 'vendor-reactdom';
            if (id.includes('react-icons')) {
              const match = /node_modules[\\/](react-icons[\\/][a-z0-9]+)/.exec(id);
              if (match) return `vendor-icons-${match[1].split(/[\\/]/).pop()}`;
              return 'vendor-icons';
            }
            if (id.includes('react-github-calendar') || id.includes('gsap') || id.includes('@emailjs')) {
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