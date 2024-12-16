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
  // antd 5.x 不需要这个
  // extraBabelPlugins: [['import', { libraryName: 'antd', style: 'css' }]],
});
