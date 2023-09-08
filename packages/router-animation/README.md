# `@hbwow/router-animation`

一个对路由切换时的页面动画。

## 使用

### 安装

```BASH
npm i @hbwow/router-animation
#or
yarn add @hbwow/router-animation
#or
pnpm add @hbwow/router-animation
```

### Demo

```tsx
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';

const location = useLocation();
const action = useNavigationType();

<Layout>
  <RouterAnimation
    routerAnimationMode={routerAnimationMode}
    action={action}
    key={location.pathname}
  >
    <div>
      <Outlet />
    </div>
  </RouterAnimation>
</Layout>;
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| routerAnimationMode | 动画效果 | IRouterAnimationMode | 'fade' | 0.0.1 |
| action | 当前的导航类型或用户如何到达当前页面；通过历史堆栈上的弹出、推送或替换操作 | IAction | 'PUSH' | 0.0.1 |
| motionProps | framer-motion其余参数 | MotionProps | {} | 0.0.1 |
| key | 用于告诉 motion 刷新 | React.Key | - | 0.0.1 |

### IRouterAnimationMode

| 参数    | 说明          |
| ------- | ------------- |
| fade    | 褪色          |
| slide   | 幻灯片        |
| slide-x | 幻灯片(X方向) |
| none    | -             |

### IAction

| 参数    | 说明 |
| ------- | ---- |
| POP     | 弹出 |
| PUSH    | 推送 |
| REPLACE | 替换 |
