import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  site: 'https://cards.slabmetrics.com', // or your actual domain
  integrations: [react()],               // <-- THIS IS THE KEY LINE
  build: { format: 'directory' }
});
