# `CustomSuspense`

> 结合 `react-query` 等请求状态管理器使用；

## 用法

```tsx
import { CustomSuspense } from '@hbwow/components';

const { isFetching, isLoading, isError } = useQuery();

<CustomSuspense isLoading={isLoading} isFetching={isFetchingToday} isError={isError}>
  ...
</CustomSuspense>;
```

## API

| 参数             | 说明                                       | 类型          | 默认值 | 版本 |
| ---------------- | ------------------------------------------ | ------------- | ------ | ---- |
| isLoading        | 是否加载中(一般为第一次)                   | boolean       | false  |
| loadingComProps  | loading组件props（使用的是 antd Skeleton） | SkeletonProps | {}     |
| isFetching       | 是否请求中                                 | boolean       | false  |
| fetchingComProps | fetch组件props（使用的是 antd Spin）       | SpinProps     | {}     |
| isError          | 是否失败（接口导致）                       | boolean       | false  |
| error            | 报错信息                                   | IError        | {}     |

IError

| 参数     | 说明             | 类型             | 默认值 | 版本 |
| -------- | ---------------- | ---------------- | ------ | ---- |
| message  | 错误提示信息     | string,ReactNode | -      |      |
| Fallback | 错误渲染的组件   | ReactNode        | -      |
| onReset  | 重新按钮点击时间 | () => void       | -      |
