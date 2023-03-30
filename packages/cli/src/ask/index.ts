/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-17 13:44:48
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-30 10:51:20
 * @FilePath: /more-repo/packages/cli/src/ask/index.ts
 * @Description:
 */
import * as p from '@clack/prompts';
import fs from 'fs-extra';

import { step1, createProject, addLints } from './askConfig';
import { CWD } from '../utils/constants';
import {
  run_install,
  run_x,
  editPackageJson,
  getProjectPath,
} from '../utils/common';
import runCommand from '../utils/runCommand';
import workCliGit from '../utils/workCliGit';

const s = p.spinner();

const ask = async () => {
  //   console.clear();

  const onCancel = () => {
    p.cancel('操作已取消。');
    process.exit(0);
  };

  const step1Result = await p.group({ ...step1 }, { onCancel });

  process.env.NPM_CLIENT = step1Result.eNpmClient;

  // console.log(step1Result, "step1Result");

  // 创建项目
  if (step1Result.projectType === 'createProject') {
    const projectResult = await p.group({ ...createProject }, { onCancel });
    const projectPath = getProjectPath(projectResult.name);

    s.start(`创建文件目录 ${projectPath}`);
    fs.mkdirpSync(projectPath);
    s.stop(`创建文件目录 ${projectPath} 完成`);

    s.start('正在拉取模版');
    await workCliGit(`direct:${projectResult.gitRepo}`, projectPath);
    s.stop('拉取模版完成');

    s.start('正在修改 package.json');
    editPackageJson({
      key: 'name',
      value: projectResult.name,
      cwd: `${projectPath}/package.json`,
    });
    s.stop('修改 package.json 完成');

    p.note(`\n`, 'Next steps.');
    p.outro(`Problems? https://example.com/issues`);
  }

  // 添加规则
  if (step1Result.projectType === 'addLints') {
    const lintsResult = await p.group({ ...addLints }, { onCancel });

    if (lintsResult.is) {
      // 1. 下载 lints 包
      s.start('Installing @hbwow/lints');
      await runCommand(
        run_install({
          use: process.env.NPM_CLIENT,
          pkgNames: '@hbwow/lints',
          isDev: true,
        }),
        { cwd: CWD },
      );
      s.stop('Installed @hbwow/lints');

      // 2. 下载 eslint stylelint prettier
      s.start('Installing eslint stylelint prettier');
      await runCommand(
        run_install({
          use: process.env.NPM_CLIENT,
          pkgNames: 'eslint stylelint prettier',
          isDev: true,
        }),
        { cwd: CWD },
      );
      s.stop('Installed eslint stylelint prettier');

      // 3. .eslintrc.js .stylelintrc.js .prettierrc.js
      s.start('Writing .eslintrc.js .stylelintrc.js .prettierrc.js');

      editPackageJson({
        key: 'scripts',
        valueObj: {
          eslint: 'eslint src --fix --ext .js,.jsx,.ts,.tsx',
          stylelint: 'stylelint **/*.{css,less,scss} --fix',
          prettier: `prettier -c --write "**/*"`,
        },
      });

      fs.writeFileSync(
        './.eslintrc.js',
        `module.exports = {
        extends: [require.resolve('@hbwow/lints/dist/eslint')],
      };`,
      );
      fs.writeFileSync(
        './.stylelintrc.js',
        `module.exports = {
        extends: [require.resolve('@hbwow/lints/dist/stylelint')],
      };`,
      );
      fs.writeFileSync(
        './.prettierrc.js',
        `const prettier = require('@hbwow/lints/dist/prettier');

      module.exports = {
        ...prettier,
      };`,
      );
      s.stop('Wrote .eslintrc.js .stylelintrc.js .prettierrc.js');

      // 4. 与 Git 工作流结合
      s.start('Installing lint-staged');
      await runCommand(
        run_install({
          use: process.env.NPM_CLIENT,
          pkgNames: 'lint-staged',
          isDev: true,
        }),
        { cwd: CWD },
      );

      editPackageJson({
        key: 'lint-staged',
        valueObj: {
          '*.{ts,tsx,js,jsx}': 'eslint --config .eslintrc.js',
          '*.{css,less,scss}': 'stylelint --config .stylelintrc.js',
          '*.{js,jsx,ts,tsx,less,md,json}': 'prettier --write',
        },
      });

      s.stop('Installed lint-staged');

      // 5. Husky
      s.start('Starting git init');
      await runCommand('git init', { cwd: CWD });
      s.stop('Started git init');

      s.start('Starting husky-init');
      await runCommand(
        run_x({ use: process.env.NPM_CLIENT, command: 'husky-init' }),
        { cwd: CWD },
      );

      await runCommand(`npx husky set .husky/pre-commit 'npx lint-staged'`, {
        cwd: CWD,
      });

      await runCommand(run_install({ use: process.env.NPM_CLIENT }), {
        cwd: CWD,
      });

      await runCommand(`npx husky add .husky/commit-msg 'npm run commitlint'`, {
        cwd: CWD,
      });

      await runCommand(
        run_install({
          use: process.env.NPM_CLIENT,
          pkgNames: '@commitlint/cli @commitlint/config-conventional',
          isDev: true,
        }),
        { cwd: CWD },
      );

      editPackageJson({
        key: 'scripts',
        valueObj: {
          'commitlint': 'commitlint --config .commitlintrc.js -e -V',
        },
      });

      fs.writeFileSync(
        './.commitlintrc.js',
        `module.exports = { extends: ['@commitlint/config-conventional'] };`,
      );

      s.stop('Started husky-init');
    }

    if (!lintsResult.is) {
      onCancel();
    }
  }
};

export default ask;
