module.exports = {
  root: true,
  extends: ['next/core-web-vitals', 'plugin:tailwindcss/recommended'],
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js built-in modules
          'external', // Packages from node_modules
          'internal', // Paths aliased with @/ or ~/
          'parent', // Imports from parent directories
          'sibling', // Imports from sibling directories
          'index', // Index imports
          'object', // Object imports
          'type', // Type imports
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
