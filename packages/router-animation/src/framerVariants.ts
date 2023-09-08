import type { Transition, Variants } from 'framer-motion';

export type IRouterAnimationMode = 'fade' | 'slide' | 'slide-x' | 'none'; // 褪色 ｜ 幻灯片 ｜ none

// framer-motion/dist/index.d.ts 搜索 `interface Spring`查看具体配置，调整动画行为
const slideTransition: Transition = {
  type: 'spring',
  duration: 0.5,
};

const fadeTransition: Transition = {
  type: 'spring',
  duration: 1.6,
};

//
function getVariants(mode: IRouterAnimationMode) {
  switch (mode) {
    case 'fade': {
      return {
        PushVariants: {
          initial: {
            opacity: 0,
          },
          in: {
            opacity: 1,
          },
          out: {
            opacity: 0,
          },
        } as Variants,
        PopVariants: {
          initial: {
            opacity: 0,
          },
          in: {
            opacity: 1,
          },
          out: {
            opacity: 0,
          },
        } as Variants,
      };
    }

    case 'slide': {
      return {
        PushVariants: {
          initial: {
            opacity: 0,
            y: '100vh',
          },
          in: {
            opacity: 1,
            y: 0,
          },
          out: {
            opacity: 0,
            y: '-100vh',
          },
        } as Variants,
        PopVariants: {
          initial: {
            opacity: 0,
            y: '-100vh',
          },
          in: {
            opacity: 1,
            y: 0,
          },
          out: {
            opacity: 0,
            y: '100vh',
          },
        } as Variants,
      };
    }

    case 'slide-x': {
      return {
        PushVariants: {
          initial: {
            opacity: 0,
            x: '100vh',
          },
          in: {
            opacity: 1,
            x: 0,
          },
          out: {
            opacity: 0,
            x: '-100vh',
          },
        } as Variants,
        PopVariants: {
          initial: {
            opacity: 0,
            x: '-100vh',
          },
          in: {
            opacity: 1,
            x: 0,
          },
          out: {
            opacity: 0,
            x: '100vh',
          },
        } as Variants,
      };
    }

    default: {
      return {};
    }
  }
}

function getTransition(mode: IRouterAnimationMode) {
  if (mode === 'fade') {
    return fadeTransition;
  }
  if (mode === 'slide') {
    return slideTransition;
  }
  if (mode === 'slide-x') {
    return slideTransition;
  }
  return {} as Transition;
}

export { getTransition, getVariants };
