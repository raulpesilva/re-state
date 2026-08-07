import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['json', 'lcov', 'text', 'clover', 'text-summary'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/tests/**', 'src/**/*.native.ts', 'src/**/*.native.tsx'],
    },
  },
});
