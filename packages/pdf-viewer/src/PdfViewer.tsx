import { useEffect, useState } from 'react';
import cx from 'classnames';

import './index.css';

export interface IPdfViewerProps {
  blob: Blob;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const PdfViewer = ({
  blob,
  width = 600,
  height = 800,
  className = '',
  style = {},
}: IPdfViewerProps) => {
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    if (!blob) return;

    const src = window.URL.createObjectURL(blob);

    setIframeSrc(src);
  }, [blob]);

  return (
    <div style={{ ...style, width: width, height: height }} className={cx('pdf-viewer', className)}>
      {blob && (
        <iframe src={iframeSrc} style={{ width: '100%', height: '100%' }}>
          <p>您的浏览器不支持 iframe 标签，请从列表中下载预览</p>
        </iframe>
      )}
    </div>
  );
};

export default PdfViewer;
