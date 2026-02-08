import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// import { componentTagger } from "lovable-tagger"; // Disabled - causing JSX corruption
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Lovable tagger disabled - was corrupting JSX with malformed data attributes
    // mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo.jpg'],
      manifest: {
        name: 'Elec-Mate',
        short_name: 'Elec-Mate',
        description: 'The complete platform for electrical professionals and apprentices',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{css,html,ico,png,jpg,jpeg,svg,woff2}'], // JS cached via runtimeCaching instead
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB fallback
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/, /^\/auth/],
        runtimeCaching: [
          {
            // JS files: NetworkFirst ensures fresh chunks after deployments
            // Falls back to cache only if network fails (offline support)
            urlPattern: /\.js$/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'js-cache',
              networkTimeoutSeconds: 5, // Fallback to cache after 5s on slow networks
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60 // 1 day max (reduced from 7 days)
              }
            }
          },
          {
            urlPattern: /^https:\/\/.*supabase\.co\/.*/i,
            handler: 'NetworkFirst', // Network with fallback, times out after 8s
            options: {
              cacheName: 'supabase-cache',
              networkTimeoutSeconds: 8, // Timeout after 8s instead of hanging forever
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 // Only cache for 1 minute (auth needs to be fresh)
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          // Core framework — always loaded
          if (/[\\/](react|react-dom|react-router|react-router-dom)[\\/]/.test(id)) return 'vendor-react';

          // UI primitives
          if (id.includes('@radix-ui')) return 'vendor-radix';

          // Heavy libs — split individually for lazy loading
          if (id.includes('recharts')) return 'vendor-charts';
          if (id.includes('jspdf')) return 'vendor-pdf';
          if (id.includes('fabric') || id.includes('html2canvas')) return 'vendor-canvas';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('@tiptap')) return 'vendor-editor';
          if (id.includes('xlsx') || id.includes('papaparse')) return 'vendor-excel';
          if (id.includes('@huggingface')) return 'vendor-ml';
          if (id.includes('@react-google-maps')) return 'vendor-maps';
          if (id.includes('react-markdown') || id.includes('rehype-') || id.includes('remark-')) return 'vendor-markdown';

          // Services
          if (id.includes('@supabase')) return 'vendor-supabase';
          if (id.includes('@tanstack')) return 'vendor-query';
          if (id.includes('posthog') || id.includes('@sentry')) return 'vendor-analytics';
          if (id.includes('@capacitor')) return 'vendor-capacitor';

          // Utils bucket
          if (/[\\/](lodash|date-fns|zod|uuid|clsx|tailwind-merge)[\\/]/.test(id)) return 'vendor-utils';
        }
      }
    }
  },
}));
