# `GlobalWarn`

> 全屏警告（屏幕边缘爆红，警告音效）；

## 用法

```tsx
import { GlobalWarn } from '@hbwow/components';

<GlobalWarn open={true} />;
```

## API

| 参数       | 说明             | 类型                                    | 默认值 | 版本 |
| ---------- | ---------------- | --------------------------------------- | ------ | ---- |
| open       | 全局警告是否开启 | boolean                                 | false  |
| audioProps | audio props      | AudioHTMLAttributes\<HTMLAudioElement\> | {}     |
| className  | 类名             | string                                  | -      |
| style      | 样式             | CSSProperties                           | -      |
