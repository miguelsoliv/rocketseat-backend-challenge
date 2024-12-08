/// <reference types="vitest" />
import { defineConfig } from 'vite';
import vitestConfig from './vitest.config.mjs';

export default defineConfig({
  test: {
    ...vitestConfig.test,
    include: ['**/*.e2e-spec.ts'],
  },
});
