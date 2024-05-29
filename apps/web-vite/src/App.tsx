import { HandleInterceptorCode, HandleInterceptorCodeCom } from '@hbwow/utils';
import { useState, useEffect, useRef } from 'react';

import {
  FullBgImage,
  LeftRightBtns,
  Tips,
  OpenNewTabOrWindowBtn,
  UploadBtn,
  ModalBtn,
  RequiredIcon,
  PartiallyTruncate,
} from '@hbwow/components';
// import { useDownload, handleDownload } from '@hbwow/hooks';

// import { md } from '@hbwow/utils';
// const { formatTreeData } = md;
// console.log('🚀🚀🚀 ~ formatTreeData:', formatTreeData);

import demoPdf from './assets/pdf-open-parameters.pdf';
import PdfViewer, { pdfViewerFn } from '@hbwow/pdf-viewer';
import { Button, Divider } from 'antd';

const handleInterceptorCode = new HandleInterceptorCode({
  ignoreCodes: [200],
  tokenExpiredCodes: [401],
});

function App() {
  const [blob, setBlob] = useState<Blob>();
  const refPdfViewer = useRef<HTMLIFrameElement>(null);

  const handleErrorCode = (code = 401) => {
    handleInterceptorCode.handleCode({ code });
  };

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
        <div style={{ color: 'white' }}>2132132</div>
      </div>

      {/* -------------- */}
      <Divider />
      <LeftRightBtns
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

      {/* -------------- */}
      <Divider />
      <PdfViewer blob={blob} ref={refPdfViewer} />

      <button
        onClick={() => {
          console.log(refPdfViewer, 'refPdfViewer');
          refPdfViewer.current?.contentWindow?.print();
        }}
      >
        print
      </button>

      {/* -------------- */}
      <Divider />
      <Tips tips='提示' />

      {/* -------------- */}
      <Divider />
      <OpenNewTabOrWindowBtn href='https://baidu.com' newWindow>
        jump
      </OpenNewTabOrWindowBtn>

      {/* -------------- */}
      <Divider />
      <UploadBtn
        action='/afas/ticket/air/freight/importAll'
        token='Bearer 3161f161-4c1b-4aa1-9756-b27346933ef2'
        data={{
          ticketType: 1,
        }}
      >
        上传
      </UploadBtn>

      {/* -------------- */}
      <Divider />
      <ModalBtn>modalBtn</ModalBtn>

      {/* -------------- */}
      <Divider />
      <div>
        <Button
          onClick={() => {
            handleErrorCode();
          }}
        >
          handleInterceptorCode
        </Button>
        <Button
          onClick={() => {
            handleErrorCode(502);
          }}
        >
          handleInterceptorCode
        </Button>
        <HandleInterceptorCodeCom />

        {/* -------------- */}
        <Divider />
        <div>
          <RequiredIcon />
          <span>必填</span>
        </div>

        {/* -------------- */}
        <Divider />
        <PartiallyTruncate>
          <PartiallyTruncate.T>
            这本书是李娟的代表作，通过散文的形式记录了她在阿勒泰生活的点滴。书中细腻的描写和深情的叙述展现了阿勒泰的自然美景和生活在那里的人的质朴和坚韧，是了解新疆自然风光和人文风情的绝佳选择。
          </PartiallyTruncate.T>
          <PartiallyTruncate.Div>--《我的阿勒泰》</PartiallyTruncate.Div>
        </PartiallyTruncate>
      </div>
    </>
  );
}

export default App;
