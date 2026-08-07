import { defineConfig } from 'tsdown';

const sourceEntries = ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/tests/**'];

const externalDependencies = [
  /^react(?:$|\/)/,
  /^react-dom(?:$|\/)/,
  /^react-native(?:$|\/)/,
  /^use-sync-external-store(?:$|\/)/,
];

const umdExternalDependencies = [/^react(?:$|\/)/, /^react-dom(?:$|\/)/];

const externalGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const unbundledOptions = {
  entry: sourceEntries,
  root: 'src',
  target: 'es2019',
  platform: 'neutral' as const,
  unbundle: true,
  treeshake: false,
  outExtensions: () => ({
    js: '.js',
    dts: '.d.ts',
  }),
  hash: false,
  sourcemap: true,
  deps: {
    neverBundle: externalDependencies,
  },
};

const createUmdConfig = (production: boolean) => ({
  entry: {
    're-state': 'src/index.ts',
  },
  format: 'umd' as const,
  outDir: 'dist',
  target: 'es2019',
  platform: 'browser' as const,
  globalName: 'ReState',
  treeshake: false,
  outExtensions: () => ({
    js: '.js',
  }),
  hash: false,
  sourcemap: true,
  clean: !production,
  minify: production,
  define: {
    'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
  },
  deps: {
    neverBundle: umdExternalDependencies,
    alwaysBundle: [/^use-sync-external-store(?:$|\/)/],
    onlyBundle: ['use-sync-external-store'],
  },
  outputOptions: {
    entryFileNames: production ? 're-state.production.min.js' : 're-state.development.js',
    globals: externalGlobals,
  },
});

export default defineConfig([
  {
    ...unbundledOptions,
    name: 'esm',
    format: 'esm',
    outDir: 'es',
    clean: true,
    dts: false,
    plugins: [
      {
        name: 'emit-esm-package-json',
        generateBundle() {
          this.emitFile({
            type: 'asset',
            fileName: 'package.json',
            source: '{\n  "type": "module"\n}\n',
          });
        },
      },
    ],
  },
  {
    ...unbundledOptions,
    name: 'commonjs',
    format: 'cjs',
    outDir: 'lib',
    clean: true,
    dts: false,
  },
  {
    ...unbundledOptions,
    name: 'types',
    format: 'esm',
    outDir: 'types',
    clean: true,
    sourcemap: false,
    dts: {
      emitDtsOnly: true,
      generator: 'tsc',
      resolver: 'tsc',
      sourcemap: true,
    },
  },
  {
    ...unbundledOptions,
    name: 'types-esm',
    format: 'esm',
    outDir: 'types',
    clean: false,
    sourcemap: false,
    outExtensions: () => ({
      js: '.mjs',
      dts: '.d.mts',
    }),
    dts: {
      emitDtsOnly: true,
      generator: 'tsc',
      resolver: 'tsc',
      sourcemap: true,
    },
  },
  {
    ...createUmdConfig(false),
    name: 'umd-development',
  },
  {
    ...createUmdConfig(true),
    name: 'umd-production',
  },
]);
