// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [react(), createHtmlPlugin({
    inject: {
      injectData: {
        script: '<script type="module" src="views/vite-frontend.jsx"></script>',
      },
    },
  })],
  publicDir: 'static',
  hmr: false, // Disable HMR

  server: {
    port: 8001, // You can specify the port here
    webSocket: false, // Disable WebSockets
    hmr: false, // Disable HMR

    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // Separate chunk for lodash (_) and three.js
        manualChunks: {
          vendor: ['underscore', 'three'],
        }
      },
      input: {
        // voiceReactiveParticles: 'views/cgi-tools/voice_reactive_particles.html',
      },
    },
    target: 'esnext', // Add this line to target the latest ECMAScript version
  },
  resolve: {
    alias: {
      views: '/views',
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
})
