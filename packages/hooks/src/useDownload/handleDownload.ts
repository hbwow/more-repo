// 下载文件
const handleDownload = async ({
  reqUrl,
  token = '',
  name = '',
  splitFileNameField = '=',
  method = 'GET',
  headers = {},
  data,
}: {
  reqUrl: string;
  token?: string;
  name?: string;
  splitFileNameField?: string;
  method?: string;
  headers?: Record<string, any>;
  data?: any;
}) => {
  const s1 = await fetch(reqUrl, {
    // responseType: 'blob',
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: token,
      ...headers,
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
  const contentType = s1.headers.get('Content-Type');

  // 错误处理(非200状态码，或者返回json)
  if (!s1.ok || (contentType && contentType.includes('application/json'))) {
    console.log('🚀🚀🚀 ~ 非200状态码，或者返回json');

    const _json = await s1.json();
    throw _json;
  }

  const s2 = await s1.blob();

  const blob = new Blob([s2]);

  // 切割出文件名
  const fileNameEncode = s1.headers.get('content-disposition')?.split(splitFileNameField)[1];
  // 解码
  const fileName = fileNameEncode ? decodeURIComponent(fileNameEncode) : '';

  if ('download' in document.createElement('a')) {
    // 非IE下载
    const eLink = document.createElement('a');
    eLink.download = name || fileName;
    eLink.style.display = 'none';
    eLink.href = URL.createObjectURL(blob);
    document.body.appendChild(eLink);
    eLink.click();
    URL.revokeObjectURL(eLink.href); // 释放URL 对象
    document.body.removeChild(eLink);
  } else {
    // IE10+下载
    navigator?.msSaveBlob?.(blob, name);
  }
};

export default handleDownload;
