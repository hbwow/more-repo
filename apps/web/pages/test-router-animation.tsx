import { useState } from 'react';

import RouterAnimation from '@hbwow/router-animation';

const Test = () => {
  const [cur, setCur] = useState<string>('home');
  const router: Record<string, React.ReactNode> = {
    home: <div>home</div>,
    about: <div>about</div>,
  };

  return (
    <div>
      <ul>
        {Object.keys(router).map((key) => {
          return (
            <li
              key={key}
              onClick={() => {
                setCur(key);
              }}
            >
              {key}
            </li>
          );
        })}
      </ul>
      <RouterAnimation key={cur} routerAnimationMode='slide'>
        {router[cur]}
      </RouterAnimation>
    </div>
  );
};

export default Test;
