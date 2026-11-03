import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            // Split rarely-changing vendor code into its own long-cached chunk
            manualChunks: {
              vendor: ['react', 'react-dom', 'framer-motion', 'lucide-react'],
            },
          },
        },
  },
}))
