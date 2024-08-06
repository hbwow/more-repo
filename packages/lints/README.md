# `@hbwow/lints`（eslint prettier stylelint）

## 安装

```BASH
npm i @hbwow/lints -D
#or
yarn add @hbwow/lints -D
#or
pnpm add @hbwow/lints -D
```

### 安装 eslint stylelint prettier

```BASH
npm i eslint@8.x stylelint@15.x prettier@3.x -D
#or
yarn add eslint@8.x stylelint@15.x prettier@3.x -D
#or
pnpm add eslint@8.x stylelint@15.x prettier@3.x -D
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
  extends: [require.resolve('@hbwow/lints/dist/eslint')],
};
```

.stylelintrc.js

```js
module.exports = {
  extends: [require.resolve('@hbwow/lints/dist/stylelint')],
};
```

.prettierrc.js

```js
const prettier = require('@hbwow/lints/dist/prettier');

module.exports = {
  ...prettier,
};
```

## 与 Git 工作流结合

```BASH
npm i lint-staged@14.x -D
#or
yarn add lint-staged@14.x -D
#or
pnpm add lint-staged@14.x -D
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

```BASH
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

```BASH
npx husky add .husky/commit-msg 'npm run commitlint'
```

安装

```BASH
npm i @commitlint/cli@17.x @commitlint/config-conventional@17.x -D
#or
yarn add @commitlint/cli@17.x @commitlint/config-conventional@17.x -D
#or
pnpm add @commitlint/cli@17.x @commitlint/config-conventional@17.x -D
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
