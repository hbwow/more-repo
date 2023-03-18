/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-17 13:44:48
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-18 11:40:19
 * @FilePath: /more-repo/packages/cli/src/ask/index.ts
 * @Description:
 */
import * as p from "@clack/prompts";
import fs from "fs-extra";

import { step1, createProject, addLints } from "./askConfig";
import { CWD, RUN_INSTALL, RUN_X } from "../utils/constants";
import runCommand from "../utils/runCommand";

const ask = async () => {
  //   console.clear();

  const onCancel = () => {
    p.cancel("操作已取消。");
    process.exit(0);
  };

  const step1Result = await p.group({ ...step1 }, { onCancel });

  process.env.NPM_CLIENT = step1Result.eNpmClient;

  // console.log(step1Result, "step1Result");

  // 创建项目
  if (step1Result.projectType === "createProject") {
    const projectResult = await p.group({ ...createProject }, { onCancel });

    console.log(projectResult, "projectResult");
  }

  // 添加规则
  if (step1Result.projectType === "addLints") {
    const lintsResult = await p.group({ ...addLints }, { onCancel });

    let pkg = fs.readJsonSync(`${CWD}/package.json`);

    if (lintsResult.is) {
      // 1. 下载 lints 包
      const s = p.spinner();
      s.start("Installing @hbwow/lints");
      await runCommand(
        RUN_INSTALL({
          use: process.env.NPM_CLIENT,
          pkgNames: "@hbwow/lints",
          isDev: true,
        }),
        { cwd: CWD }
      );
      s.stop("Installed @hbwow/lints");

      // 2. 下载 eslint stylelint prettier
      s.start("Installing eslint stylelint prettier");
      await runCommand(
        RUN_INSTALL({
          use: process.env.NPM_CLIENT,
          pkgNames: "eslint stylelint prettier",
          isDev: true,
        }),
        { cwd: CWD }
      );
      s.stop("Installed eslint stylelint prettier");

      // 3. .eslintrc.js .stylelintrc.js .prettierrc.js
      s.start("Writing .eslintrc.js .stylelintrc.js .prettierrc.js");

      pkg = fs.readJsonSync(`${CWD}/package.json`);
      pkg.scripts["eslint"] = "eslint src --fix --ext .js,.jsx,.ts,.tsx";
      pkg.scripts["stylelint"] = "stylelint **/*.{css,less,scss} --fix";
      pkg.scripts["prettier"] = `prettier -c --write "**/*"`;
      fs.writeJsonSync(`${CWD}/package.json`, pkg);

      fs.writeFileSync(
        "./.eslintrc.js",
        `module.exports = {
        extends: [require.resolve('@hbwow/lints/dist/eslint')],
      };`
      );
      fs.writeFileSync(
        "./.stylelintrc.js",
        `module.exports = {
        extends: [require.resolve('@hbwow/lints/dist/stylelint')],
      };`
      );
      fs.writeFileSync(
        "./.prettierrc.js",
        `const prettier = require('@hbwow/lints/dist/prettier');

      module.exports = {
        ...prettier,
      };`
      );
      s.stop("Wrote .eslintrc.js .stylelintrc.js .prettierrc.js");

      // 4. 与 Git 工作流结合
      s.start("Installing lint-staged");
      await runCommand(
        RUN_INSTALL({
          use: process.env.NPM_CLIENT,
          pkgNames: "lint-staged",
          isDev: true,
        }),
        { cwd: CWD }
      );

      pkg = fs.readJsonSync(`${CWD}/package.json`);
      pkg["lint-staged"] = {};
      pkg["lint-staged"]["*.{ts,tsx,js,jsx}"] = [
        "eslint --config .eslintrc.js",
      ];
      pkg["lint-staged"]["*.{css,less,scss}"] = [
        "stylelint --config .stylelintrc.js",
      ];
      pkg["lint-staged"]["*.{js,jsx,ts,tsx,less,md,json}"] = [
        "prettier --write",
      ];
      fs.writeJsonSync(`${CWD}/package.json`, pkg);

      s.stop("Installed lint-staged");

      // 5. Husky
      s.start("Starting git init");
      await runCommand("git init", { cwd: CWD });
      s.stop("Started git init");

      s.start("Starting husky-init");
      await runCommand(
        RUN_X({ use: process.env.NPM_CLIENT, command: "husky-init" }),
        { cwd: CWD }
      );

      await runCommand(`npx husky set .husky/pre-commit 'npx lint-staged'`, {
        cwd: CWD,
      });

      await runCommand(RUN_INSTALL({ use: process.env.NPM_CLIENT }), {
        cwd: CWD,
      });

      await runCommand(`npx husky add .husky/commit-msg 'npm run commitlint'`, {
        cwd: CWD,
      });

      await runCommand(
        RUN_INSTALL({
          use: process.env.NPM_CLIENT,
          pkgNames: "@commitlint/cli @commitlint/config-conventional",
          isDev: true,
        }),
        { cwd: CWD }
      );

      pkg = fs.readJsonSync(`${CWD}/package.json`);
      pkg.scripts["commitlint"] = "commitlint --config .commitlintrc.js -e -V";
      fs.writeJsonSync(`${CWD}/package.json`, pkg);

      fs.writeFileSync(
        "./.commitlintrc.js",
        `module.exports = { extends: ['@commitlint/config-conventional'] };`
      );

      s.stop("Started husky-init");
    }

    // console.log(lintsResult, "lintsResult");
  }
};

export default ask;
