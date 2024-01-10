# `useDownload & handleDownload`

> useDownload 在 handleDownload 基础上增加了ReactQuery，单独使用 handleDownload 也可；

## 用法

```tsx
import useDownload from '@hbwow/components';

const { mutate: mutateDownload, isLoading: isLoadingDownload } = useDownload();

<Button
  loading={isLoadingDownload}
  onClick={() => {
    mutateDownload({
      reqUrl: `/apis/download`,
      token: `Bearer ${getLocalToken()}`,
      method: 'GET',
    });
  }}
>
  下载
</Button>;
```

```tsx
import { handleDownload } from '@hbwow/components';

<Button
  loading={isLoadingDownload}
  onClick={() => {
    handleDownload({
      reqUrl: `/apis/download`,
      token: `Bearer ${getLocalToken()}`,
      method: 'GET',
    });
  }}
>
  下载
</Button>;
```

## API

| 参数    | 说明                   | 类型                | 默认值 | 版本 |
| ------- | ---------------------- | ------------------- | ------ | ---- |
| reqUrl  | 下载的地址             | string              | -      |
| token   | 认证 token             | string              | -      |
| name    | 重命名文件名           | string              | -      |
| method  | 下载请求的 http method | string              | GET    |
| headers | 额外的请求头           | Record<string, any> | -      |
| data    | 额外的数据             | any                 | -      |

## 注意

要使用接口返回的文件名，接口的 Response Headers 格式必须为

```
Content-Disposition: attachment;filename=我是文件名.xlsx
```
