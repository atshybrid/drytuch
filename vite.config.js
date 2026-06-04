import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo.png', 'favicon.ico', 'robots.txt', 'sitemap.xml', 'llms.txt'],
      manifest: {
        name: 'DryTuch.com',
        short_name: 'DryTuch',
        description: 'Premium dried meats, vegetables, fruits & nuts',
        background_color: '#FAFAF9',
        theme_color: '#FAFAF9',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/logo.png', sizes: '192x192', type: 'image/png' },
          { src: '/logo.png', sizes: '512x512', type: 'image/png' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,svg,woff2}', 'logo.png'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => /\.(png|jpg|jpeg|webp)$/i.test(url.pathname),
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-product-images',
              expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
