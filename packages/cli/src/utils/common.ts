/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-18 20:19:47
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-29 16:29:04
 * @FilePath: /more-repo/packages/cli/src/utils/common.ts
 * @Description:
 */

import fs from 'fs-extra';
import { join } from 'path';

import { CWD } from '@/utils/constants';

/**
 * @description: 运行安装
 * @return {*}
 */
export const run_install = ({
  use,
  pkgNames,
  isDev,
}: {
  use: string;
  pkgNames?: string;
  isDev?: boolean;
}) => {
  const useYarn = use === 'yarn';
  const usePnpm = use === 'pnpm';

  if (pkgNames) {
    return `${use} ${useYarn || usePnpm ? 'add' : 'install'} ${pkgNames} ${
      isDev ? '-D' : ''
    }`;
  }

  return `${use} install`;
};

/**
 * @description: 运行
 * @param {object} param1
 * @return {*}
 */
export const run_x = ({ use, command }: { use: string; command: string }) => {
  const useYarn = use === 'yarn';
  const usePnpm = use === 'pnpm';
  return `${useYarn || usePnpm ? use : 'npx'} ${
    useYarn || usePnpm ? 'dlx' : ''
  } ${command}`;
};

/**
 * @description: 修改 package.json
 * @return {*}
 */
export const editPackageJson = ({
  key,
  value,
  valueObj,
  cwd = `${CWD}/package.json`,
}: {
  key: string;
  value?: string;
  valueObj?: Record<string, any>;
  cwd?: string;
}) => {
  const pkg = fs.readJsonSync(cwd);

  if (value) {
    pkg[key] = value;
  }

  if (valueObj) {
    if (!pkg[key]) {
      pkg[key] = {};
    }
    Object.keys(valueObj).forEach((k) => {
      const val = valueObj[k];

      pkg[key][k] = val;
    });
  }

  fs.writeJsonSync(cwd, pkg, { spaces: 2 });
};

/**
 * @description: 获取项目目录
 * @return {*}
 */
export const getProjectPath = (projectName: string) => {
  return join(CWD, projectName);
};
