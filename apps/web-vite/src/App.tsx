// import { HandleInterceptorCode } from '@hbwow/utils';
import { useState, useEffect, useRef } from 'react';

import {
  FullBgImage,
  TableHeaderBtns,
  Tips,
  OpenNewTabOrWindowBtn,
  UploadBtn,
} from '@hbwow/components';
// import { useDownload, handleDownload } from '@hbwow/hooks';

// import { md } from '@hbwow/utils';
// const { formatTreeData } = md;
// console.log('🚀🚀🚀 ~ formatTreeData:', formatTreeData);

import demoPdf from './assets/pdf-open-parameters.pdf';
import PdfViewer, { pdfViewerFn } from '@hbwow/pdf-viewer';

// const handleInterceptorCode = new HandleInterceptorCode({
//   ignoreCodes: [200],
//   tokenExpiredCodes: [401],
// });

function App() {
  const [blob, setBlob] = useState<Blob>();
  const refPdfViewer = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // handleInterceptorCode.handleCode({ code: 401 });
  }, []);

  useEffect(() => {
    function pdfToBlob(pdfUrl) {
      return fetch(pdfUrl)
        .then((response) => response.blob())
        .then((blob) => {
          // pdfViewerFn(blob);
          setBlob(blob);
        });
    }

    pdfToBlob(demoPdf);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', width: '600px', height: '400px' }}>
        <FullBgImage />
        <div>2132132</div>
      </div>

      <TableHeaderBtns
        leftBtns={[
          { children: '复制创建订单' },
          { children: '复制创建订单' },
          { children: '复制创建订单' },
          <div style={{ border: '1px solid' }} className='bg-red'>
            1111
          </div>,
          { children: '复制创建订单' },
        ]}
      />

      <PdfViewer blob={blob} ref={refPdfViewer} />

      <button
        onClick={() => {
          console.log(refPdfViewer, 'refPdfViewer');
          refPdfViewer.current?.contentWindow?.print();
        }}
      >
        print
      </button>

      <Tips tips='提示' />

      <OpenNewTabOrWindowBtn href='https://baidu.com' newWindow>
        jump
      </OpenNewTabOrWindowBtn>

      <UploadBtn
        action='http://airport-freight-dev.psc.sw/afas/ticket/air/freight/importAll'
        token='Bearer 0e2e652b-9d25-485f-948c-5fdf74625269'
      >
        上传
      </UploadBtn>
    </>
  );
}

export default App;
