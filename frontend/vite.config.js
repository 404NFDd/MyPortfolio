import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,       // 0.0.0.0 바인딩
    port: 5173,
    hmr: {
      clientPort: 8080,
    },
    watch: {
      usePolling: true,
    },
  },
})
