# aladdin 内部规则库（eslint prettier stylelint）

## 安装
### 安装 npm 包
```shell
npm i @md/aladdin-rules -D
#or
pnpm add @md/aladdin-rules -D
```

### 安装 eslint stylelint prettier
```shell
npm i eslint stylelint prettier -D
#or
pnpm add eslint stylelint prettier -D
```

## 配置
package.json
```json
"scripts": {
  "eslint": "eslint src --fix --ext .js,.jsx,.ts,.tsx",
  "stylelint": "stylelint **/*.{css,less,scss} --fix",
  "prettier": "prettier -c --write \"**/*\""
},
```

.eslintrc.js
```js
module.exports = {
  extends: [require.resolve('@md/aladdin-rules/dist/eslint')],
};
```

.stylelintrc.js
```js
module.exports = {
  extends: [require.resolve('@md/aladdin-rules/dist/stylelint')],
};
```

.prettierrc.js
```js
const prettier = require('@md/aladdin-rules/dist/prettier');

module.exports = {
  ...prettier,
};
```

## 与 Git 工作流结合
```shell
npm i lint-staged -D
#or
pnpm add lint-staged -D
```

package.json
```json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": [
    "eslint --config .eslintrc.js"
  ],
  "*.{css,less,scss}": [
    "stylelint --config .stylelintrc.js"
  ],
  "*.{js,jsx,ts,tsx,less,md,json}": [
    "prettier --write"
  ]
},
```

## Husky
```shell
npx husky-init && npm install
#or
pnpm dlx husky-init && pnpm install
```

**修改 pre-commit**

.husky/pre-commit
```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### commit 规范
添加 commit-msg 钩子
```shell
npx husky add .husky/commit-msg 'npm run commitlint'
```

安装
```shell
npm i @commitlint/cli @commitlint/config-conventional -D
#or
pnpm add @commitlint/cli @commitlint/config-conventional -D
```

.commitlintrc.js
```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

package.json
```json
"scripts": {
  "commitlint": "commitlint --config .commitlintrc.js -e -V",
},
```

## VS Code 配置
.vscode/settings.json
```json
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "editor.formatOnSave": true, // 保存自动格式化
  "eslint.format.enable": true // 启用eslint格式化
```