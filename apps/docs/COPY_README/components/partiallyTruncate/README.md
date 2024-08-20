# `PartiallyTruncate`

> 部分省略

![](./image.png)

## 用法

```tsx
import { PartiallyTruncate } from '@hbwow/components';

<PartiallyTruncate>
  <PartiallyTruncate.T>
    这本书是李娟的代表作，通过散文的形式记录了她在阿勒泰生活的点滴。书中细腻的描写和深情的叙述展现了阿勒泰的自然美景和生活在那里的人的质朴和坚韧，是了解新疆自然风光和人文风情的绝佳选择。
  </PartiallyTruncate.T>
  <PartiallyTruncate.Div>--《我的阿勒泰》</PartiallyTruncate.Div>
</PartiallyTruncate>;
```

## API

### ICommonProps

| 参数      | 说明 | 类型            | 默认值 | 版本 |
| --------- | ---- | --------------- | ------ | ---- |
| children  | -    | React.ReactNode | -      |
| className | -    | string          | -      |

### IPartiallyTruncateProps 同 ICommonProps

### ITProps

| 参数         | 说明                                      | 类型                  | 默认值 | 版本 |
| ------------ | ----------------------------------------- | --------------------- | ------ | ---- |
| tooltipProps | antd tooltip；为 false 时，不显示 tooltip | TooltipProps \| false | -      |

### IDivProps 同 ICommonProps
