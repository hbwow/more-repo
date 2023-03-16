module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/eslint')],

  rules: {
    'no-console': 2,
    '@typescript-eslint/no-explicit-any': 1, // ts any
    'react/self-closing-comp': 1, // 空标签
    'max-lines': [
      'error',
      {
        max: 500,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
