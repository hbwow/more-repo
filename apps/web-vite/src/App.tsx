import { HandleInterceptorCode } from '@hbwow/utils';
import { useEffect } from 'react';

import { FullBgImage } from '@hbwow/components';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200],
  tokenExpiredCodes: [401],
});

function App() {
  useEffect(() => {
    // handleInterceptorCode.handleCode({ code: 401 });
  }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '600px', height: '400px' }}>
        <FullBgImage />
        <div>2132132</div>
      </div>
    </>
  );
}

export default App;
