import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactHooks from 'eslint-plugin-react-hooks';

const eslintConfig = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Preserved legacy business logic, kept as a reference for future work.
    // eslint-plugin-react-hooks v7 introduces stricter rules that flag
    // pre-existing patterns here. This code is intentionally out of scope for
    // the current refactor and will be reimplemented later, so keep the new
    // rules visible as warnings instead of rewriting untested auth code.
    files: [
      'src/features/**',
      'src/services/**',
      'src/store/**',
      'src/hooks/**',
      // Retained app shell that wires the preserved store/business logic
      // (canonical Redux Toolkit per-request store pattern).
      'src/app/store-provider.tsx',
      'src/app/layout.tsx',
    ],
    // Register the plugin in this same config object so the rule references
    // resolve regardless of dependency hoisting (do not rely on the plugin
    // being provided transitively by eslint-config-next).
    plugins: { 'react-hooks': reactHooks },
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/refs': 'warn',
    },
  },
  eslintConfigPrettier,
];

export default eslintConfig;
