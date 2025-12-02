import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  // 🚨 เพิ่ม/แก้ไขส่วนนี้
  server: {
    proxy: {
      // 1. Chat Log & History
      '/api/chat': {
        target: 'http://45.91.133.108:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/ai-gemini'),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
          });
        },
      },
      // 2. Authentication
      '/api/login/auth': {
        target: 'http://45.91.133.108:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/login\/auth/, '/auth'),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
          });
        },
      },
      // 3. Facebook
      '/api/facebook': {
        target: 'http://45.91.133.108:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/facebook/, '/facebook'),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
          });
        },
      },
      // 4. Settings
      '/api/settings': {
        target: 'http://45.91.133.108:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/settings/, '/settings'),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
          });
        },
      },

      // 5. AI Gemini
      '/ai-gemini': {
        target: 'http://45.91.133.108:3000',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
          });
        },
      },

      // General /api fallback (if needed)
      '/api': {
        target: 'http://45.91.133.108:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes, req) => {
            proxyRes.headers['access-control-allow-origin'] = req.headers.origin || '*';
            proxyRes.headers['access-control-allow-credentials'] = 'true';
          });
        },
      },

      // n8n webhooks
      '/webhook': {
        target: 'http://localhost:5678',
        changeOrigin: true,
      },
      '/workflow': {
        target: 'http://localhost:5678',
        changeOrigin: true,
      }
    }
  }
})
