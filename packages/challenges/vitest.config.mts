/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.service.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['html'],
    },
    alias: {
      '@core': '/src/core',
      '@infra': '/src/infra',
      '@shared': '/src/shared',
    },
  },
});
