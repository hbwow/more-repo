import { useState } from 'react';

import { Button, ButtonProps, Upload, UploadProps, message } from 'antd';

export interface IUploadBtnProps extends ButtonProps {
  action: string; // 上传的地址
  method?: string; // 上传请求的 http method
  token?: string; // 认证 token
  headers?: Record<string, any>; // 额外的请求头
  data?: Record<string, any>; // 额外的数据
  uploadProps?: UploadProps;
  buttonProps?: ButtonProps;

  showSuccessMessage?: boolean; // 是否展示成功消息
  showErrorMessage?: boolean; // 是否展示错误消息

  onSuccess?: (res?: any) => void;
  onError?: (res?: any) => void;
}

const UploadBtn = ({
  action = '',
  method = 'post',
  token = '',
  headers = {},
  data = {},

  showSuccessMessage = true,
  showErrorMessage = true,

  onSuccess,
  onError,
  uploadProps = {},
  ...rest
}: IUploadBtnProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutateUpload = async (
    params: FormData,
    options: { _onSuccess: (res: any) => void; _onError: (error: any) => void },
  ) => {
    try {
      setIsLoading(true);

      const res = await fetch(action, {
        method: method,
        body: params,
        headers: {
          // 'Content-Type': 'multipart/form-data',
          authorization: token,
          ...headers,
        },
      });
      const data = await res.json();

      setIsLoading(false);

      if (res.status === 200) {
        options?._onSuccess?.(data);
      } else {
        throw data;
      }

      return data;
    } catch (error) {
      setIsLoading(false);
      options?._onError?.(error);
    }
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    let formData = new FormData();
    formData.append('file', file);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    mutateUpload(formData, {
      _onSuccess: (res) => {
        // console.log('🚀🚀🚀 ~ res:', res);
        showSuccessMessage && message.success('导入成功！');
        onSuccess?.(res);
      },
      _onError: (error) => {
        // console.log('🚀🚀🚀 ~ error:', error);
        showErrorMessage && message.error('导入失败！');
        onError?.(error);
      },
    });
  };

  return (
    <Upload fileList={[]} beforeUpload={() => false} onChange={handleChange} {...uploadProps}>
      <Button {...rest} loading={isLoading} />
    </Upload>
  );
};

export default UploadBtn;
