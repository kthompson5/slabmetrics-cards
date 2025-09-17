import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',       // full static export
  site: 'https://slabmetrics.com', // for absolute OG URLs
  build: { format: 'directory' }
});
