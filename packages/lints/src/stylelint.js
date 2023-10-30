module.exports = {
  extends: [require.resolve('@umijs/lint/dist/config/stylelint')],

  rules: {
    'color-function-notation': 'legacy', // rgb 使用老的方式，modern的方式不知道是解析器版本问题还是less 问题会导致不生效
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'tailwind'],
      },
    ],
  },
};
