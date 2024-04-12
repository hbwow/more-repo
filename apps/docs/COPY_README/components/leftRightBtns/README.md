# `LeftRightBtns`

> 左右区域的操作按钮
>
> 常用于表格顶部左边一些操作按钮，右边也有一些操作按钮，也可只设置单边

## 用法

```tsx
import { LeftRightBtns } from '@hbwow/components';

<LeftRightBtns
  leftBtns={[<ModalBtn>批量删除</ModalBtn>]}
  rightBtns={[
    {
      children: '新增',
      type: 'primary',
      onClick: () => {},
    },
  ]}
/>;
```

## API

| 参数          | 说明                         | 类型   | 默认值 | 版本 |
| ------------- | ---------------------------- | ------ | ------ | ---- |
| leftBtns      | 左边的所有按钮               | IBtns  | -      |
| rightBtns     | 右边的所有按钮               | IBtns  | -      |
| leftMaxLength | 左边按钮最大数，超出的收起来 | number | 5      |
| className     | 类名                         | string | -      |

type IBtns = (ButtonProps | React.ReactNode)[]; // antd ButtonProps
