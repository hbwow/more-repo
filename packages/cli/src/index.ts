/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-16 21:41:59
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-17 16:18:20
 * @FilePath: /more-repo/packages/cli/src/index.ts
 * @Description:  入口文件
 */

import { program } from "commander"; // 命令行解析工具
import chalk from "chalk"; // 输出增色
import clear from "clear"; // 清空终端屏幕
import figlet from "figlet"; // 生成基于`ASCII`的艺术字

import create from "./create";
import { PKG } from "./utils/constants";

clear();
console.log(
  chalk.yellow(figlet.textSync("HBWOW", { horizontalLayout: "full" }))
);

program
  // 定义命令和参数
  // .command("create <project-name>")
  .description("创建一个新的项目")
  .action(async (projectName) => {
    // 打印命令行输入的值
    // console.log(chalk.green(`项目名称是：${projectName}`));
    // require("../lib/create")(projectName);

    await create();
  });

program.version(PKG.version);

// 解析用户执行命令传入参数
program.parse(process.argv);
