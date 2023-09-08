import { motion, MotionProps } from 'framer-motion';

import { getTransition, getVariants } from './framerVariants';
import type { IRouterAnimationMode } from './framerVariants';

type IAction = 'POP' | 'PUSH' | 'REPLACE';
enum ActionEnum {
  POP = 'POP',
  PUSH = 'PUSH',
  REPLACE = 'REPLACE',
}

interface IProps {
  routerAnimationMode?: IRouterAnimationMode; // 动画效果
  action?: IAction; // 当前的导航类型或用户如何到达当前页面；通过历史堆栈上的弹出、推送或替换操作。
  motionProps?: MotionProps; // framer-motion其余参数
  key: React.Key; // 用于告诉 motion 刷新
  children?: React.ReactNode;
}

const RouterAnimation = ({
  children,
  action = 'PUSH',
  routerAnimationMode = 'fade',
  key,
  motionProps = {},
}: IProps) => {
  const { PushVariants, PopVariants } = getVariants(routerAnimationMode);
  const routerTransition = getTransition(routerAnimationMode);

  return (
    <motion.div
      initial="initial" // 与 variants 对应
      animate="in" // 与 variants 对应
      exit="out" // 与 variants 对应
      key={key}
      transition={routerTransition}
      variants={action === ActionEnum.POP ? PopVariants : PushVariants}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};

export default RouterAnimation;
