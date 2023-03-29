/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-17 12:52:08
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-29 16:46:36
 * @FilePath: /more-repo/packages/cli/src/create.ts
 * @Description: 创建文件
 */
import ask from './ask';
import checkVersion from '@/utils/checkVersion';

import ora from 'ora'; // 命令行loading

const spinner = ora();

const create = async () => {
  spinner.start();
  await checkVersion();
  spinner.succeed();

  await ask();
};

export default create;
