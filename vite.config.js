import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  // 🚨 เพิ่ม/แก้ไขส่วนนี้
  server: {
    proxy: {
      // Proxy login routes -> local demo backend
      '/api/login': {
        target: 'https://integer-maps-extract-towards.trycloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/login/, ''),
      },

      // Proxy chat routes -> local demo backend
      '/api/chat': {
        target: 'https://integer-maps-extract-towards.trycloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, ''),
      },

      // Proxy Facebook helper routes (apifb) -> local demo backend
      '/apifb': {
        target: 'https://integer-maps-extract-towards.trycloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apifb/, ''),
      },

      // General /api -> backend (images, other api calls)
      '/api': {
        target: 'https://integer-maps-extract-towards.trycloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
      ,
      // Proxy n8n webhook paths to local n8n (avoid CORS during dev)
      '/workflow': {
        target: 'https://integer-maps-extract-towards.trycloudflare.com',
        changeOrigin: true,
        rewrite: (path) => path, // keep path as-is; frontend will usually be normalized to /webhook
      }
    }
  }
})
