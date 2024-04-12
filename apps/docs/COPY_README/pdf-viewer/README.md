# `@hbwow/pdf-viewer`

## PdfViewer

> 展示 pdf 组件

### 用法

```tsx
import PdfViewer from '@hbwow/pdf-viewer';

const [blob, setBlob] = useState<Blob>();
const refPdfViewer = useRef<HTMLIFrameElement>(null);

useEffect(() => {
  function pdfToBlob(pdfUrl) {
    return fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        setBlob(blob);
      });
  }

  pdfToBlob(demoPdf);
}, []);

<PdfViewer blob={blob} ref={refPdfViewer} />;
```

### API

| 参数      | 说明          | 类型                | 默认值 | 版本 |
| --------- | ------------- | ------------------- | ------ | ---- |
| blob      | pdf blob      | Blob                | -      |
| width     | 外层 dom 宽度 | number              | -      |
| height    | 外层 dom 高度 | number              | -      |
| className | 外层 dom 类名 | string              | -      |
| style     | 外层 dom 样式 | React.CSSProperties | -      |

## pdfViewerFn

> 新开窗口展示pdf

### 用法

```tsx
import { pdfViewerFn } from '@hbwow/pdf-viewer';

useEffect(() => {
  function pdfToBlob(pdfUrl) {
    return fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blobRes) => {
        // const blob = new Blob([blobRes], { type: 'application/pdf' }); // ！！！有些场景需要再次转换下 然后传递

        pdfViewerFn(blobRes);
      });
  }

  pdfToBlob(demoPdf);
}, []);
```

### API

| 参数 | 说明     | 类型 | 默认值 | 版本 |
| ---- | -------- | ---- | ------ | ---- |
| blob | pdf blob | Blob | -      |
