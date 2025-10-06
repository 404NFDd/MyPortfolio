import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // 0.0.0.0로 바인딩 (컨테이너 외부에서 접근 가능)
    port: 5173,
    strictPort: true,
    allowedHosts: true,   // 컨테이너 프록시(nginx 등) 통해 들어오는 Host 허용
    hmr: {
      host: 'localhost',  // 브라우저 기준 HMR 접속 호스트
      port: 5173,
    },
    cors: true,
  },
})
