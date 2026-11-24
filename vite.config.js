import { defineConfig } from 'vite';

export default defineConfig({
  // Relative base ensures seamless deployment on both Vercel (root domain)
  // and GitHub Pages (subpath) with zero configuration changes.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});
