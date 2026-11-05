import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

// A separate static target keeps the existing Cloudflare application intact.
export default defineConfig({
  root: resolve('./pages'),
  base: '/choosing-abstinence/',
  publicDir: resolve('./public'),
  plugins: [react()],
  define: {
    'process.env.NEXT_PUBLIC_BASE_PATH': JSON.stringify('/choosing-abstinence'),
    'process.env.NEXT_PUBLIC_STATIC_SITE': JSON.stringify('true'),
  },
  build: {
    outDir: resolve('./dist/pages'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve('./pages/index.html'),
        privacy: resolve('./pages/privacy/index.html'),
      },
    },
  },
});
