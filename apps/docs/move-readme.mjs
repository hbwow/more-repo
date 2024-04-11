#!/usr/bin/env zx

import { readdir, stat, mkdir, cp } from 'fs/promises';
import { join } from 'path';

const FOLDER_NAME = 'MOVE_README';

// console.log('🚀🚀🚀 ~ 当前目录:', __dirname);

async function copyFilesInDirectory(sourceDir, destinationDir) {
  try {
    // 创建目标目录（如果不存在）
    await mkdir(destinationDir, { recursive: true });

    // 读取源目录中的所有文件和子文件夹
    const items = await readdir(sourceDir);

    // // 遍历每个文件或子文件夹
    for (const item of items) {
      const itemPath = join(sourceDir, item);
      const itemStat = await stat(itemPath);

      // 是否是文件夹
      if (itemStat.isDirectory()) {
        const readmePath = join(itemPath, 'README.md');

        const subDir = join(destinationDir, item);

        // 创建目标子目录（如果不存在）
        await mkdir(subDir, { recursive: true });

        // 复制 README.md 文件到目标子目录
        if (await stat(readmePath).catch(() => false)) {
          await cp(readmePath, join(subDir, 'README.md'));
        }

        console.log(chalk.green(`Copied Successfully: <${item}>`));
      }

      //
    }
  } catch (error) {
    console.error(`Error copying files: ${error}`);
  }
}

console.log(chalk.yellow('------- 复制 Components 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/components/src'),
  // join(__dirname, `/apps/docs/${FOLDER_NAME}/components`),
  join(__dirname, `/${FOLDER_NAME}/components`),
);

console.log(chalk.yellow('------- 复制 Hooks 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/hooks/src'),
  // join(__dirname, `/apps/docs/${FOLDER_NAME}/hooks`),
  join(__dirname, `/${FOLDER_NAME}/components`),
);
