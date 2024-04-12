#!/usr/bin/env zx

import { readdir, stat, mkdir, rm, cp } from 'fs/promises';
import { join } from 'path';

const FOLDER_NAME = 'COPY_README';

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

      //外层有 README.md 文件，直接复制
      if (item === 'README.md') {
        cp(itemPath, join(destinationDir, 'README.md'));

        console.log(chalk.green(`Copied Successfully: <${item}>`));
      }

      // readme 文件路径
      const readmePath = join(itemPath, 'README.md');
      const isReadmeFile = await stat(readmePath).catch(() => false);

      // 是否是文件夹
      if (itemStat.isDirectory() && isReadmeFile) {
        // 复制 README.md 文件到目标子目录
        const subDir = join(destinationDir, item);

        // 创建目标子目录（如果不存在）
        await mkdir(subDir, { recursive: true });

        await cp(readmePath, join(subDir, 'README.md'));

        console.log(chalk.green(`Copied Successfully: <${item}>`));
      }
    }
  } catch (error) {
    console.error(`Error copying files: ${error}`);
  }
}

console.log(chalk.red(`------- 删除 ${FOLDER_NAME} 文件夹 -------`));
await rm(join(__dirname, `/${FOLDER_NAME}`), { force: true, recursive: true });

console.log(chalk.yellow('------- 复制 Components 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/components/src'),
  // join(__dirname, `/apps/docs/${FOLDER_NAME}/components`),
  join(__dirname, `/${FOLDER_NAME}/components`),
);

console.log(chalk.yellow('------- 复制 Hooks 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/hooks/src'),
  join(__dirname, `/${FOLDER_NAME}/hooks`),
);

console.log(chalk.yellow('------- 复制 Cli 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/cli'),
  join(__dirname, `/${FOLDER_NAME}/cli`),
);

console.log(chalk.yellow('------- 复制 Lints 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/lints'),
  join(__dirname, `/${FOLDER_NAME}/lints`),
);

console.log(chalk.yellow('------- 复制 pdf-viewer 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/pdf-viewer'),
  join(__dirname, `/${FOLDER_NAME}/pdf-viewer`),
);

console.log(chalk.yellow('------- 复制 router-animation 的 README.md -------'));
await copyFilesInDirectory(
  join(__dirname, '../../packages/router-animation'),
  join(__dirname, `/${FOLDER_NAME}/router-animation`),
);
