# `RouteAuthorization`

> 路由权限校验；

## 用法

```tsx
import { RouteAuthorization } from '@hbwow/components';

<RouteAuthorization route={route} pathname={location.pathname}>
  ...
</RouteAuthorization>;
```

## API

| 参数          | 说明                     | 类型                      | 默认值         | 版本 |
| ------------- | ------------------------ | ------------------------- | -------------- | ---- |
| route         | 路由配置                 | Record<string, any>       | {}             |
| pathname      | 当前pathname             | string                    | ''             |
| getRouteAuth  | 可自定义校验方法         | (params: any) => boolean; | \_getRouteAuth |
| pathField     | 去和 pathname 匹配的字段 | string                    | 'path'         |
| childrenField | 去递归的字段             | string                    | 'children'     |
| resultProps   | antd Result组件 props    | ResultProps               | {}             |
