# `AuthButton`

> 权限校验组件；

## 用法

```tsx
import { AuthButton } from '@hbwow/components';

<AuthButton authId='xxx'>查看机密</AuthButton>;
```

## API

| 参数     | 说明              | 类型 | 默认值 | 版本 |
| -------- | ----------------- | ---- | ------ | ---- |
| authId | 唯一标识符 | string  | -      |
| authList | 标识符列表（优先级 authList > sessionStorage > localStorage） | string[] | -      |
| localKey | 本地存储的key（用于拿本地缓存的 authList） |  string |  'authButtons'      |
| isBtn | 是否需要包装成按钮（默认是有一个 button 组件的） |  boolean | -      |
