/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-17 12:49:05
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-29 15:32:52
 * @FilePath: /more-repo/packages/cli/src/ask/askConfig.ts
 * @Description:
 */

import * as p from '@clack/prompts';
import fs from 'fs-extra';

import { E_NPM_CLIENT } from '../utils/constants';
import { getProjectPath } from '../utils/common';
import templateList from './templates';

export const step1 = {
  eNpmClient: () => {
    return p.select({
      message: '请选择包管理工具',
      initialValue: 'pnpm',
      options: [
        ...Object.values(E_NPM_CLIENT).map((val) => ({
          label: val,
          value: val,
        })),
      ],
    });
  },
  projectType: () => {
    return p.select({
      message: '选择您想要的',
      options: [
        { value: 'createProject', label: '创建项目' },
        { value: 'addLints', label: '加入eslint、stylelint、prettier规则' },
      ],
    });
  },
};

export const createProject = {
  name: () => {
    return p.text({
      message: '请输入项目名称：',
      placeholder: 'hbwow-app',
      validate: (name) => {
        const projectPath = getProjectPath(name);

        if (!name) {
          return '请输入项目名称！';
        }

        if (fs.pathExistsSync(projectPath)) {
          return '目标目录已存在!';
        }
      },
    });
  },
  gitRepo: () => {
    return p.select({
      message: '请选择项目类型',
      options: templateList,
    });
  },
};

export const addLints = {
  is: () => {
    return p.confirm({
      message: '确认（请在项目根目录下运行该指令）',
      initialValue: false,
    });
  },
};
