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
  onSuccess?: () => void;
}

const UploadBtn = ({
  action = '',
  method = 'post',
  token = '',
  headers = {},
  data = {},
  onSuccess,
  uploadProps = {},
  ...rest
}: IUploadBtnProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const mutateUpload = async (
    params: FormData,
    options: { onSuccess: () => void; onError: () => void },
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

      setIsLoading(false);

      if (res.status === 200) {
        options?.onSuccess?.();
      } else {
        throw new Error('上传失败');
      }

      return res;
    } catch (error) {
      setIsLoading(false);
      options?.onError?.();
    }
  };

  const handleChange: UploadProps['onChange'] = ({ file }) => {
    let formData = new FormData();
    formData.append('file', file);

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    mutateUpload(formData, {
      onSuccess: () => {
        message.success('导入成功！');
        onSuccess?.();
      },
      onError: () => {
        message.error('导入失败！');
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
