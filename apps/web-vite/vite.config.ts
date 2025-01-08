import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'node_modules/@hbwow/components/lib/pwsHtml/**/*', dest: 'pwsHtml' }],
    }),
  ],
  server: {
    port: 3124,
    proxy: {
      '/api': {
        target: 'http://example.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/githubApi/, ''),
        // configure: (proxy, options) => {
        // proxy will be an instance of 'http-proxy'
        // },
      },
    },
  },
});
