# `Tips`

> 将 Tooltip 和 Button 合并在一起；
>
> 解决一些业务场景需要 hover 或者 click 一个内容需要提示信息；

## 用法

```tsx
import { Tips } from '@hbwow/components';

<Tips tips={<div>我是tip</div>} />;
```

## API

| 参数             | 说明                   | 类型                       | 默认值 | 版本 |
| ---------------- | ---------------------- | -------------------------- | ------ | ---- |
| tips             | 提示内容               | React.ReactNode            | -      |
| icon             | icon或者按钮内任意内容 | React.ReactNode            | -      |
| defaultIconProps | 默认 icon props        | React.SVGProps<SVGElement> | -      |
| buttonProps      | antd button            | ButtonProps                | -      |
| tooltipProps     | antd tooltipProps      | ButtonProps                | -      |
