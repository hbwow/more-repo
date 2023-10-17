import { HandleInterceptorCode } from '@hbwow/utils';
import { useEffect } from 'react';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200],
  tokenExpiredCodes: [401],
});

function App() {
  useEffect(() => {
    handleInterceptorCode.handleCode({ code: 401 });
  }, []);

  return <>1111</>;
}

export default App;
