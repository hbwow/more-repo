# `@hbwow/lints`（eslint prettier stylelint）

## 安装

```BASH
npm i @hbwow/lints -D
#or
yarn i @hbwow/lints -D
#or
pnpm add @hbwow/lints -D
```

### 安装 eslint stylelint prettier

```BASH
npm i eslint stylelint prettier -D
#or
yarn i eslint stylelint prettier -D
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
npm i lint-staged -D
#or
yarn add lint-staged -D
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
npm i @commitlint/cli @commitlint/config-conventional -D
#or
yarn add @commitlint/cli @commitlint/config-conventional -D
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
