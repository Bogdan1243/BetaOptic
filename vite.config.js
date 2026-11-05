import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const prerenderRoutesPreviewPlugin = () => ({
  name: 'prerender-routes-preview',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/outlet' || req.url === '/outlet/') {
        req.url = '/outlet/index.html'
      } else if (req.url === '/medici' || req.url === '/medici/') {
        req.url = '/medici/index.html'
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), prerenderRoutesPreviewPlugin()],
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
