/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-17 16:00:17
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-18 11:02:31
 * @FilePath: /more-repo/packages/cli/src/utils/constants.ts
 * @Description:
 */
import { join } from "path";

export const PKG_PATH = join(__dirname, "../../package.json");
export const PKG = require(PKG_PATH);

export const CWD = process.cwd(); //当前运行node命令的目录
export const PROJECT_PATH = (projectName) => join(__dirname, "projectName");

export const E_NPM_CLIENT = {
  npm: "npm",
  yarn: "yarn",
  pnpm: "pnpm",
};
