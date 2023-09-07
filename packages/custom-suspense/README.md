# `@hbwow/custom-suspense`

> 1.x 版本基于 antd 4.x

> 2.x 版本基于 antd 5.x

## 使用

```BASH
npm i @hbwow/custom-suspense
#
yarn i @hbwow/custom-suspense
#
pnpm i @hbwow/custom-suspense
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| isLoading | 是否加载中(一般为第一次) | boolean | false |
| loadingComProps | loading组件props（使用的是 antd Skeleton） | SkeletonProps | {} |
| isFetching | 是否请求中 | boolean | false |
| fetchingComProps | fetch组件props（使用的是 antd Spin） | SpinProps | {} |
| isError | 是否失败（接口导致） | boolean | false |
| error | 报错信息 | { message?: string; Fallback?: ReactNode; onReset?: () => void; } | {} |
