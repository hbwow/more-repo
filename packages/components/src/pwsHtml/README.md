# `pwsHtml`

> 白屏等待时加载的loading动画；

## 用法

### vite

```BASH
pnpm add -D vite-plugin-static-copy
```

vite.config.ts

```ts
import { viteStaticCopy } from 'vite-plugin-static-copy';

...
 plugins: [
    ...,
    viteStaticCopy({
       targets: [{ src: 'node_modules/@hbwow/components/lib/pwsHtml/**/*', dest: 'pwsHtml' }],
    }),
  ],

```

index.html

```html
<head>
  ...
  <script src="/pwsHtml/index.js"></script>
</head>
```

### 其他编译器（比如webpack可参照vite使用）

## API

```html
<!-- 这里可以传 data-warpid， 默认为 root； data-basename：基准URL -->
<script type="module" src="/pwsHtml/index.js" data-warpid="app" data-basename=""></script>
```
