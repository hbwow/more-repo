# `handleInterceptorCode`

> 处理拦截器返回的错误码

## 用法

```ts
import { HandleInterceptorCode } from '@hbwow/utils';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200],
  tokenExpiredCodes: [401],
});

// handleInterceptorCode.handleCode({ code, message, headers, onErrorCallback, modalProps });

axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    const { data } = response;

    const is = handleInterceptorCode.handleCode({
      code: data.code,
      message: data.message,
      headers,
    });

    if (!is) {
      return Promise.reject(data.message);
    }

    return data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    handleInterceptorCode.handleCode({
      code: error.response.status,
      message: error.message,
      headers,
    });

    return Promise.reject(error);
  },
);
```

```ts
import { HandleInterceptorCode } from '@hbwow/utils';


headers: {
  ...HandleInterceptorCode.NO_NOTIFY_MESSAGE; // 不需要弹窗提示（在请求headers里面添加）
}

```

## API

#### HandleInterceptorCode

| 参数              | 说明            | 类型     | 默认值 | 版本 |
| ----------------- | --------------- | -------- | ------ | ---- |
| ignoreCodes       | 需要忽略的 code | number[] | [200]  |      |
| tokenExpiredCodes | token过期 code  | number[] | [401]  |      |

#### handleCode

| 参数            | 说明                        | 类型                | 默认值   | 版本 |
| --------------- | --------------------------- | ------------------- | -------- | ---- |
| code            | 状态码                      | number              | -        |      |
| message         | 提示信息                    | string              | 未知错误 |      |
| headers         | 请求头                      | Record<string, any> | {}       |      |
| modalProps      | 提示框使用的是 antd Modal） | ModalProps          | {}       |      |
| onErrorCallback | 错误回调                    | () => void          | -        |      |
