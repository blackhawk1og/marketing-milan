import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `mockup/` is the original static site, kept for reference only — it is not
  // part of the React build and does not follow these rules.
  globalIgnores(['dist', 'mockup']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Server-side: the Vercel function, its helpers, and the Vite config all run
    // in Node and legitimately reach for `process`.
    files: ['api/**/*.js', 'vite.config.js'],
    languageOptions: { globals: globals.node },
  },
])
