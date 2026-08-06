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
    strictPort: false,
    hmr: {
      overlay: false,
      host: 'localhost',
      protocol: 'ws'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // react-icons লাইব্রেরির প্রতিটি আইকন সেটকে আলাদা চাঙ্কে ভাগ করুন
            const match = /node_modules[\\/](react-icons[\\/][a-z]{2})/.exec(id);
            if (match) {
              return `vendor-react-icons-${match[1].split(/[\\/]/).pop()}`;
            }
            return 'vendor'; // বাকি সব ভেন্ডর লাইব্রেরি
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'prop-types']
  }
})