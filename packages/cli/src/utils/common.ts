/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-18 20:19:47
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-18 21:13:31
 * @FilePath: /more-repo/packages/cli/src/utils/common.ts
 * @Description:
 */

import fs from "fs-extra";
import { CWD } from "@/utils/constants";

export const run_install = ({
  use,
  pkgNames,
  isDev,
}: {
  use: string;
  pkgNames?: string;
  isDev?: boolean;
}) => {
  const useYarn = use === "yarn";
  const usePnpm = use === "pnpm";

  if (pkgNames) {
    return `${use} ${useYarn || usePnpm ? "add" : "install"} ${pkgNames} ${
      isDev ? "-D" : ""
    }`;
  }

  return `${use} install`;
};

export const run_x = ({ use, command }: { use: string; command: string }) => {
  const useYarn = use === "yarn";
  const usePnpm = use === "pnpm";
  return `${useYarn || usePnpm ? use : "npx"} ${
    useYarn || usePnpm ? "dlx" : ""
  } ${command}`;
};

export const editPackageJson = ({
  key,
  valueObj,
  cwd = `${CWD}/package.json`,
}: {
  key: string;
  valueObj?: Record<string, any>;
  cwd?: string;
}) => {
  const pkg = fs.readJsonSync(cwd);

  if (valueObj) {
    Object.keys(valueObj).forEach((k) => {
      const val = valueObj[k];

      pkg[key][k] = val;
    });
  } else {
    pkg[key] = {};
  }

  fs.writeJsonSync(cwd, pkg);
};
