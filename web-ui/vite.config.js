   // vite.config.js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
    publicDir: 'static',
    //  root: '',
     server: {
       port: 8000, // You can specify the port here
       proxy: {
         '/api': {
           target: 'http://localhost:8003',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     },
    build: {
      rollupOptions: {
        input: {
          main: 'views/cgi-tools/voice_reactive_particles.html',
          // Add more HTML files here if needed
        },
      },
    },
    //  resolve: {
    //    alias: {
    //      $components: '/src/components',
    //      $assets: '/src/assets',
    //      $styles: '/src/styles',
    //      $utils: '/src/utils',
    //      $types: '/src/types',
    //      $hooks: '/src/hooks',
    //      $contexts: '/src/contexts',
    //    }
    // } 
     
   })

  //  mexico +london  + japan were fun -> (__inpso__, )
