import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { execSync } from 'child_process';
// import { componentTagger } from "lovable-tagger"; // Disabled - causing JSX corruption
import { VitePWA } from 'vite-plugin-pwa';
import { compression } from 'vite-plugin-compression2';
import { sentryVitePlugin } from '@sentry/vite-plugin';

// Git commit hash for Sentry release tracking
const gitCommit = (() => {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
})();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    __SENTRY_RELEASE__: JSON.stringify(`elec-mate@${gitCommit}`),
  },
  server: {
    host: '::',
    port: 8080,
    watch: {
      ignored: ['**/ios/**', '**/android/**'],
    },
  },
  plugins: [
    react(),
    // Lovable tagger disabled - was corrupting JSX with malformed data attributes
    // mode === 'development' && componentTagger(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
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
            type: 'image/jpeg',
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
          },
          {
            src: 'logo.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable',
          },
        ],
      },
      injectManifest: {
        globPatterns: ['**/*.{html,css,ico,png,jpg,jpeg,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
      devOptions: {
        enabled: false, // Set to true to test SW in dev mode
        type: 'module',
      },
    }),
    mode === 'production' && compression({ algorithm: 'gzip', threshold: 1024 }),
    mode === 'production' && compression({ algorithm: 'brotliCompress', threshold: 1024 }),
    // Source-map upload to Sentry — only runs when SENTRY_AUTH_TOKEN is set
    // (CI / production builds), so local dev builds without the token still
    // succeed without uploading anything. Symbolicates minified stack traces
    // in Sentry so issues like RangeError and ReferenceError actually point
    // at real source files instead of `App-qembCcYp.js:507:54649 (pt)`.
    process.env.SENTRY_AUTH_TOKEN &&
      sentryVitePlugin({
        org: 'elec-mate',
        project: 'javascript-react',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        url: 'https://de.sentry.io/',
        release: { name: `elec-mate@${gitCommit}` },
        sourcemaps: {
          // Maps build alongside the chunks; the plugin uploads them then
          // (by default) deletes the .map files from the deployed dist so
          // the public bundle doesn't ship sourceMappingURL comments.
          filesToDeleteAfterUpload: ['./dist/**/*.map'],
        },
        // Don't fail the build if upload fails (e.g. transient network).
        // Sentry just won't have maps for that build — better than blocking
        // a deploy because of a Sentry hiccup.
        errorHandler: (err) => {
          console.warn('[sentry-vite-plugin] upload failed (non-fatal):', err.message);
        },
      }),
  ].filter(Boolean),
  optimizeDeps: {
    noDiscovery: true,
    include: [
      'react',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      '@tanstack/react-query',
      '@supabase/supabase-js',
      'framer-motion',
      'lucide-react',
      'recharts',
      'react-hook-form',
      'react-helmet',
      '@hookform/resolvers/zod',
      'zod',
      'date-fns',
      'lodash',
      'lodash/debounce',
      'clsx',
      'tailwind-merge',
      'uuid',
      'sonner',
      'cmdk',
      'vaul',
      'input-otp',
      'react-day-picker',
      'react-resizable-panels',
      'react-swipeable',
      'canvas-confetti',
      'posthog-js',
      '@sentry/react',
      '@capacitor/core',
      '@capacitor/camera',
      '@capacitor/filesystem',
      '@capacitor/haptics',
      '@capacitor/keyboard',
      '@capacitor/share',
      '@capacitor/browser',
      '@capacitor/app',
      '@capacitor/splash-screen',
      '@capacitor/status-bar',
      '@capacitor/push-notifications',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-collapsible',
      '@radix-ui/react-context-menu',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-hover-card',
      '@radix-ui/react-label',
      '@radix-ui/react-menubar',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-progress',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-scroll-area',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slider',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group',
      '@radix-ui/react-tooltip',
      'next-themes',
      'class-variance-authority',
      'embla-carousel-react',
      'lottie-react',
      'qrcode.react',
      'react-signature-canvas',
      'html2canvas',
      'dompurify',
      'jszip',
      'jspdf',
      'jspdf-autotable',
      'fabric',
      'xlsx',
      'papaparse',
      'idb',
      'use-sound',
      '@hello-pangea/dnd',
      'react-markdown',
      'rehype-highlight',
      'remark-gfm',
      '@tiptap/react',
      '@tiptap/starter-kit',
      '@tiptap/extension-placeholder',
      '@react-google-maps/api',
      '@elevenlabs/react',
      'html5-qrcode',
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    drop: ['console'],
  },
  build: {
    // Source maps are only generated when SENTRY_AUTH_TOKEN is set (CI /
    // production deploys). 'hidden' = build the .map files for upload but
    // don't add sourceMappingURL comments to the JS, so they're not
    // auto-loaded by browsers. The Sentry vite plugin then uploads + deletes
    // the .map files from dist. Without a token, no maps are generated at
    // all — guarantees nothing can leak to the deployed bundle.
    sourcemap: process.env.SENTRY_AUTH_TOKEN ? 'hidden' : false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-toast',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-label',
            '@radix-ui/react-switch',
            '@radix-ui/react-slider',
            '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-separator',
            '@radix-ui/react-tooltip',
          ],
          'vendor-charts': ['recharts'],
          'vendor-pdf': ['jspdf', 'jspdf-autotable'],
          'vendor-canvas': ['fabric', 'html2canvas'],
          'vendor-motion': ['framer-motion'],
          'vendor-editor': [
            '@tiptap/react',
            '@tiptap/starter-kit',
            '@tiptap/extension-placeholder',
          ],
          'vendor-excel': ['xlsx', 'papaparse'],
          'vendor-supabase': ['@supabase/supabase-js'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-utils': ['lodash', 'date-fns', 'zod', 'uuid', 'clsx', 'tailwind-merge'],
          'vendor-ml': ['@huggingface/transformers'],
          'vendor-analytics': ['posthog-js', '@sentry/react'],
          'vendor-maps': ['@react-google-maps/api'],
          'vendor-capacitor': [
            '@capacitor/core',
            '@capacitor/camera',
            '@capacitor/filesystem',
            '@capacitor/haptics',
            '@capacitor/keyboard',
            '@capacitor/share',
            '@capacitor/browser',
          ],
          'vendor-markdown': ['react-markdown', 'rehype-highlight', 'remark-gfm'],
        },
      },
    },
  },
}));
