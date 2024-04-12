const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx',
});

module.exports = withNextra({
  i18n: {
    locales: ['zh-CN', 'en-US'],
    defaultLocale: 'zh-CN',
  },

  redirects: () => {
    return [
      {
        source: '/components',
        destination: '/components/index',
        statusCode: 301,
      },
      {
        source: '/hooks',
        destination: '/hooks/index',
        statusCode: 301,
      },
      {
        source: '/cli',
        destination: '/cli/index',
        statusCode: 301,
      },
      {
        source: '/lints',
        destination: '/lints/index',
        statusCode: 301,
      },
      {
        source: '/pdf-viewer',
        destination: '/pdf-viewer/index',
        statusCode: 301,
      },
      {
        source: '/projects',
        destination: '/projects/index',
        statusCode: 301,
      },
    ];
  },

  reactStrictMode: true,
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
