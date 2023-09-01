import { useState, useEffect } from 'react';

import { Button } from 'ui';
import CustomSuspense from '@hbwow/custom-suspense';
import { HandleInterceptorCode } from '@hbwow/utils';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200],
  tokenExpiredCodes: [401],
});

export default function Web() {
  const fetchData = (delay: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5, 6]);
      }, delay);
    });
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData(2000).then(() => {
      setIsLoading(false);
    });

    handleInterceptorCode.handleCode({ code: 201 });
  }, []);

  return (
    <div>
      <h1>Web</h1>
      <Button />

      <>
        <CustomSuspense
          isLoading={isLoading}
          isFetching={isFetching}
          isError={isError}
          error={{
            onReset: () => {
              setIsError(false);
            },
          }}
        >
          <div style={{ width: '60vw', height: '20vh', backgroundColor: 'red' }}>
            加载成功！！！
          </div>
        </CustomSuspense>

        <button
          onClick={() => {
            setIsFetching(true);
            fetchData(2000).then(() => {
              setIsFetching(false);
            });
          }}
        >
          click reFetch
        </button>
        <button
          onClick={() => {
            setIsError(true);
          }}
        >
          click error
        </button>
      </>
    </div>
  );
}
