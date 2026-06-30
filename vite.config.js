import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

/** Dev uses index.source.html; production index.html lives at repo root for GitHub Pages. */
function devSourceHtml() {
  return {
    name: 'dev-source-html',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          req.url = '/index.source.html'
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Use '/' for username.github.io — use '/me/' if keeping the project repo name
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), tailwindcss(), devSourceHtml()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.source.html'),
      },
    },
  },
})
