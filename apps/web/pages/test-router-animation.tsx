import { useState } from 'react';

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
    </div>
  );
};

export default Test;
