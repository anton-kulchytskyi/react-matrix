/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
    css: true,
  },
  resolve: {
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@context': '/src/context',
      '@types': '/src/types',
      '@utils': '/src/utils',
    },
  },
});
