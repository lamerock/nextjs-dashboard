import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  ...nextVitals,
    {
    rules: {
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-direct-mutation-state': 'off',
      'react/no-render-return-value': 'off',
      'react/no-string-refs': 'off'
    },
  },
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);

export default eslintConfig;