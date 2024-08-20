import { useEffect, useState } from 'react';

import { Button, ButtonProps } from 'antd';

export interface IAuthButtonProps extends ButtonProps {
  authId: string; // 唯一标识符
  authList?: string[]; // 标识符列表
  localKey?: string; // 本地存储的key
  isBtn?: boolean; // 是否需要包装成按钮
}

const AuthButton = ({ authId, authList, localKey = 'authButtons',isBtn = true, ...rest }: IAuthButtonProps) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let lAuthList = null;
    let sAuthList = null;

    try {
      sAuthList = JSON.parse(sessionStorage.getItem(localKey));
    } catch (error) {
      console.warn('AuthButton sessionStorage failed');
    }

    try {
      lAuthList = JSON.parse(localStorage.getItem(localKey));
    } catch (error) {
      console.warn('AuthButton localStorage failed');
    }

    const _authList = authList || sAuthList || lAuthList || [];

    setIsShow(_authList.includes(authId));
  }, [authId, authList, localKey]);

  if (!isBtn) {
    return isShow ? <>{rest?.children}</> : null;
  }

  return isShow ? <Button {...rest} /> : null;
};

export default AuthButton;
