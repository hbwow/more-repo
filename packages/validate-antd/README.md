# `@hbwow/validate-antd`

> 将 antd 表单校验逻辑以及校验规则抽离

## 使用

### 全局配置

新增配置时

```tsx
import { ConfigProvider } from '@hbwow/validate-antd';

<ConfigProvider icon={} rulesMap={{}}>
  <App />
</ConfigProvider>;
```

### 具体实例

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
import { useGetRules } from '@hbwow/validate-antd';
const { getRules } = useGetRules();

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
import { ConfigProvider } from '@hbwow/validate-antd';

<ConfigProvider
  rulesMap={{
    isEmptyIsPhone: (value: string) => {
      if (!value) {
        return 'value不能为空！';
      }
      if (!new RegExp(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/).test(value)) {
        return '请输入正确的手机号码！';
      }
      return '';
    },
  }}
>
  <App />
</ConfigProvider>;

// ----------------------------------------

const { getRules } = useGetRules();

<Form.Item label='手机号' name='phone' rules={[...getRules({ name: 'isEmptyIsPhone' })]}>
  <Input placeholder='请输入'></Input>
</Form.Item>;
```

## API

### ConfigProvider

| 参数     | 说明           | 类型                                   | 默认值 | 版本  |
| -------- | -------------- | -------------------------------------- | ------ | ----- |
| icon     | 校验提示的icon | React.ReactNode                        | -      | 0.0.1 |
| rulesMap | 新增校验规则   | Record<string, (value: any) => string> | -      | 0.0.1 |

#### 默认的 rulesMap

| name     | 说明                   | 版本  |
| -------- | ---------------------- | ----- |
| isEmpty  | 不能为空               | 0.0.1 |
| phone    | 手机号                 | 0.0.1 |
| idCard   | 身份证                 | 0.0.1 |
| email    | 邮箱                   | 0.0.1 |
| passport | 护照（包含香港、澳门） | 0.0.1 |

### getRules

| 参数     | 说明           | 类型    | 默认值 | 版本  |
| -------- | -------------- | ------- | ------ | ----- |
| name     | 规则名         | string  | -      | 0.0.1 |
| required | 是否为必选字段 | boolean | true   | 0.0.1 |
| optional | 是否选填       | boolean | false  | 0.0.1 |
