// 新标签页打开预览 pdf，如果浏览器拦截，则需要授权
const pdfViewerFn = (blob: Blob) => {
  //非ie
  if ('download' in document.createElement('a')) {
    const src = window.URL.createObjectURL(blob);

    window.open(src, '_blank'); //打开一个新窗口
    window.URL.revokeObjectURL(src); //释放内存
  }
};

export default pdfViewerFn;
