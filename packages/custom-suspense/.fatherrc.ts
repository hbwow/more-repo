import { defineConfig } from 'father';

const path = require('path');

export default defineConfig({
  esm: {
    output: 'es',
  },
  cjs: {
    output: 'lib',
  },
  umd: {
    output: 'dist',
  },
  platform: 'browser',
  extraBabelPlugins: [['import', { libraryName: 'antd', style: 'css' }]],
});
