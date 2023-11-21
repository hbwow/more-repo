// import { HandleInterceptorCode } from '@hbwow/utils';
import { useEffect } from 'react';

import { FullBgImage } from '@hbwow/components';

// import demoPdf from './assets/pdf-open-parameters.pdf';
// import PdfViewer, { pdfViewerFn } from '@hbwow/pdf-viewer';

// const handleInterceptorCode = new HandleInterceptorCode({
//   ignoreCodes: [200],
//   tokenExpiredCodes: [401],
// });

function App() {
  // const [blob, setBlob] = useState<Blob>();

  useEffect(() => {
    // handleInterceptorCode.handleCode({ code: 401 });
  }, []);

  // useEffect(() => {
  //   function pdfToBlob(pdfUrl) {
  //     return fetch(pdfUrl)
  //       .then((response) => response.blob())
  //       .then((blob) => {
  //         pdfViewerFn(blob);
  //         setBlob(blob);
  //       });
  //   }

  //   pdfToBlob(demoPdf);
  // }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '600px', height: '400px' }}>
        <FullBgImage />
        <div>2132132</div>
      </div>

      {/* <PdfViewer blob={blob} /> */}
    </>
  );
}

export default App;
