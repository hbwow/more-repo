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

## API

### HandleInterceptorCode

```ts
import { HandleInterceptorCode } from '@hbwow/utils';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200],
  tokenExpiredCodes: [401],
});

handleInterceptorCode.handleCode({ code, message, headers, onCallback, modalProps });
```

```ts
import { HandleInterceptorCode } from '@hbwow/utils';


headers: {
  ...HandleInterceptorCode.NO_NOTIFY_MESSAGE; // 不需要弹窗提示（在请求headers里面添加）
}

```

#### HandleInterceptorCode

| 参数              | 说明            | 类型     | 默认值 | 版本  |
| ----------------- | --------------- | -------- | ------ | ----- |
| ignoreCodes       | 需要忽略的 code | number[] | [200]  | 0.0.1 |
| tokenExpiredCodes | token过期 code  | number[] | [401]  | 0.0.1 |

#### handleCode

| 参数       | 说明                        | 类型                | 默认值   | 版本  |
| ---------- | --------------------------- | ------------------- | -------- | ----- |
| code       | 状态码                      | number              | -        | |
| message    | 提示信息                    | string              | 未知错误 | |
| headers    | 请求头                      | Record<string, any> | {}       | |
| modalPropsForTokenExpired    | token失效弹窗 modal props                      | ModalFuncProps | {}       | |
| modalProps | 提示框使用的是 antd Modal） | ModalProps          | {}       | |
