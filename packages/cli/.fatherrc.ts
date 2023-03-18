import { defineConfig } from "father";

const path = require("path");

export default defineConfig({
  // esm: {
  //   output: 'es',
  // },
  cjs: {
    output: "dist",
  },
  // umd: {},
  platform: "node",
});
