/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-17 12:56:25
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-17 12:58:07
 * @FilePath: /more-repo/packages/cli/src/utils/logger.ts
 * @Description: 
 */
import chalk from "chalk"; // 输出增色

const XN_PREFIX = `hbwow:`;

const prefixes = {
  wait: chalk.cyan(`[${XN_PREFIX}wait]`) + "  -",
  error: chalk.red(`[${XN_PREFIX}error]`) + " -",
  warn: chalk.yellow(`[${XN_PREFIX}warn]`) + "  -",
  ready: chalk.green(`[${XN_PREFIX}ready]`) + " -",
  info: chalk.cyan(`[${XN_PREFIX}info]`) + "  -",
  event: chalk.magenta(`[${XN_PREFIX}event]`) + " -",
  debug: chalk.gray(`[${XN_PREFIX}debug]`) + " -",
};

function wait(...message: any[]) {
  console.log(prefixes.wait, ...message);
}

function error(...message: any[]) {
  console.error(prefixes.error, ...message);
}

function warn(...message: any[]) {
  console.warn(prefixes.warn, ...message);
}

function ready(...message: any[]) {
  console.log(prefixes.ready, ...message);
}

function info(...message: any[]) {
  console.log(prefixes.info, ...message);
}

function event(...message: any[]) {
  console.log(prefixes.event, ...message);
}

function debug(...message: any[]) {
  if (process.env.DEBUG) {
    console.log(prefixes.debug, ...message);
  }
}

export const logger = {
  wait,
  error,
  warn,
  ready,
  info,
  event,
  debug,
};
