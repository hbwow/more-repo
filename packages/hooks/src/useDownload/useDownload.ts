import { useMutation } from '@tanstack/react-query';
import handleDownload from './handleDownload';

// 下载文件 useMutation
const useDownload = () => {
  return useMutation(handleDownload);
};

export default useDownload;
