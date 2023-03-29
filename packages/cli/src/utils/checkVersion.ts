/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-29 14:01:42
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-29 15:13:54
 * @FilePath: /more-repo/packages/cli/src/utils/checkVersion.ts
 * @Description:
 */
import fetch from 'node-fetch';
import semver from 'semver';

import { logger } from './logger';
import { PKG } from './constants';

const checkVersion = async () => {
  // 检测 node 版本
  if (!semver.satisfies(process.version, PKG.engines.node)) {
    logger.error(`使用该脚手架 node 版本必须 ${PKG.engines.node}`);
    process.exit(0);
  } else {
    logger.info(`当前 node 版本为：${process.version}`);
  }

  // 检测 cli 版本
  try {
    const res = await fetch(`https://registry.npmjs.org/@hbwow/cli`);
    const json = await res.json();

    const latestVersion = json['dist-tags'].latest;
    const localVersion = PKG.version;

    if (semver.lt(localVersion, latestVersion)) {
      logger.info(
        `cli 当前版本为${localVersion}，有新版本${latestVersion}可用，请使用最新的版本安装`,
      );
      process.exit(0);
    } else {
      logger.info(`当前 cli 版本为：${localVersion}`);
    }
  } catch (error) {
    logger.error(error);
    process.exit(0);
  }
};

export default checkVersion;
