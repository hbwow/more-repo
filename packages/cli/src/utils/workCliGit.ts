/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-03-29 13:40:44
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-03-29 14:00:31
 * @FilePath: /more-repo/packages/cli/src/utils/workCliGit.ts
 * @Description: git clone 方法
 */
import download from 'download-git-repo';

/**
 * @description: 
 * @param {string} repository https://xxxxx.com
 * @param {string} projectName
 * @return {*}
 */
const workCliGit = (repository: string, projectName: string) => {
  return new Promise((resolve, reject) => {
    download(repository, projectName, { clone: true }, function (err) {
      err ? reject(err) : resolve('');
    });
  });
};

export default workCliGit;
