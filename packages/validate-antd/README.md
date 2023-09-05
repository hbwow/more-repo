# `@hbwow/validate-antd`

## 全局配置

```tsx
import { ConfigProvider } from '@hbwow/validate-antd';

<ConfigProvider icon={} rulesMap={}>
  <App />
</ConfigProvider>;
```

## Demo-1

**默认**

```tsx
<Form.Item
  label='手机号'
  name='phone'
  rules={[
    { required: true, message: '请输入手机号' },
    {
      pattern: new RegExp(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/),
      message: '请输入正确的手机号码',
    },
  ]}
>
  <Input placeholder='请输入'></Input>
</Form.Item>
```

**使用 @hbwow/validate-antd**

方式一

```tsx
import { getRules } from '@hbwow/validate-antd';
const { getRules } = useGetRules();
import { useGetRules } from '@hbwow/validate-antd';
import { ConfigProvider } from '@hbwow/validate-antd';
<Form.Item
  label='手机号'
  name='phone'
  rules={[...getRules({ name: 'isEmpty' }), ...getRules({ name: 'phone', optional: true })]}
>
  <Input placeholder='请输入'></Input>
</Form.Item>;
```

方式二（自定义校验规则）

```tsx
<ConfigProvider
   rulesMap={{
        isEmptyIsPhone: (value: string) => {
          if (!value) {
            return 'value不能为空！';
          }
          if (
            !new RegExp(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/).test(value)
          ) {
            return '请输入正确的手机号码！';
          }
          return '';
        },
      }}
>
  <App />
</ConfigProvider>


<Form.Item
  label='手机号'
  name='phone'
  rules={[...getRules({ name: 'isEmptyIsPhone' })]}
>
  <Input placeholder='请输入'></Input>
</Form.Item>;
```
