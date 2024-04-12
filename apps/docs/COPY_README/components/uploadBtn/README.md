# `UploadBtn`

> 将 Upload 和 Button 合并在一起；
>
> 解决一些业务场景直接点击就上传文件；

## 用法

```tsx
import { UploadBtn } from '@hbwow/components';

<UploadBtn
  action='/apis/upload'
  data={{ ticketType: 1 }}
  token={`Bearer ${getLocalToken()}`}
  onSuccess={(res) => {}}
>
  导入
</UploadBtn>;
```

## API

| 参数        | 说明                   | 类型                | 默认值 | 版本 |
| ----------- | ---------------------- | ------------------- | ------ | ---- |
| action      | 上传的地址             | string              | -      |
| method      | 上传请求的 http method | string              | post   |
| token       | 认证 token             | string              | -      |
| headers     | 额外的请求头           | Record<string, any> | -      |
| data        | 额外的数据             | Record<string, any> | -      |
| uploadProps | antd upload            | UploadProps         | -      |
| buttonProps | antd button            | ButtonProps         | -      |
| onSuccess   | 上传成功的回调         | (res?: any) => void | -      |
