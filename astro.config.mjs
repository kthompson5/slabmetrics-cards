import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  site: 'https://cards.slabmetrics.com', // change if needed
  integrations: [react()],
  build: { format: 'directory' }
});
