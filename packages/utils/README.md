# `@hbwow/utils`

> 1.x 版本基于 antd 4.x

> 2.x 版本基于 antd 5.x

## 使用

```BASH
npm i @hbwow/utils
#
yarn i @hbwow/utils
#
pnpm i @hbwow/utils
```

### HandleInterceptorCode

```ts
import { HandleInterceptorCode } from '@hbwow/utils';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200], // 需要忽略的 code list
  tokenExpiredCodes: [401], // token过期 code list
});

handleInterceptorCode.handleCode({ code, message, headers, onCallback, modalProps });
```

```ts
import { HandleInterceptorCode } from '@hbwow/utils';


headers: {
  ...HandleInterceptorCode.NO_NOTIFY_MESSAGE; // 不需要弹窗提示（在请求headers里面添加）
}

```

## API

| 参数                  | 说明                            | 类型    | 默认值 | 版本  |
| --------------------- | ------------------------------- | ------- | ------ | ----- |
| HandleInterceptorCode | 响应拦截code处理，message提示…… | boolean | false  | 0.0.1 |
