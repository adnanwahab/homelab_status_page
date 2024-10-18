   // vite.config.js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'


   export default defineConfig({
     plugins: [react()],
    publicDir: 'static',
    root: 'js',
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
        external: ['three',  /^screenshot\.png$/ , 'firefox.png'],
        input: {
          main: 'index.html', // Change this to your main entry point
          voiceReactiveParticles: 'views/cgi-tools/voice_reactive_particles.html',
          // Add more HTML files here if needed
        },
      },
      target: 'esnext', // Add this line to target the latest ECMAScript version
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
