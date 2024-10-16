/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2024-01-24 15:35:03
 * @LastEditors: 冷开俊 lengkj@travelsky.com.cn
 * @LastEditTime: 2024-10-16 11:09:55
 * @FilePath: /more-repo/packages/utils/src/handleInterceptorCode/handleInterceptorCodeCom.tsx
 * @Description: 因为直接静态方法使用Modal会导致拿不到context上下文，所以写个组件搭配使用
 */
import React, { useEffect, useState } from 'react';

import { Modal, ModalFuncProps } from 'antd';

import { emitter } from '../utils/eventEmit';
import { EVENTS_NAME } from './handleInterceptorCode';

interface IModalProps extends ModalFuncProps {
  modalMethod?: 'info' | 'success' | 'error' | 'warning' | 'confirm'; // 弹窗类型
  modalDestroyAll?: boolean; // 销毁所有弹窗
}

export interface IHandleInterceptorCodeComProps {
  customRender?: (props: any) => React.ReactNode; // 自定义渲染
}

const HandleInterceptorCodeCom = ({ customRender }: IHandleInterceptorCodeComProps) => {
  const [modal, contextHolder] = Modal.useModal();
  const [modalProps, setModalProps] = useState<IModalProps>();

  useEffect(() => {
    const listener = (_modalProps: IModalProps) => {
      if (customRender) {
        setModalProps(_modalProps);
      }

      const { modalMethod = 'warning', modalDestroyAll, onOk, ...rest } = _modalProps;

      const nextProps: IModalProps = { ...rest };

      if (onOk) {
        nextProps.onOk = () => {
          onOk();
          if (modalDestroyAll) {
            Modal.destroyAll();
          }
        };
      }

      modal[modalMethod]({ ...nextProps });
    };

    emitter.on(EVENTS_NAME, listener);

    return () => {
      emitter.off(EVENTS_NAME, listener);
    };
  }, [modal, customRender]);

  return <>{customRender ? customRender({ ...modalProps }) : contextHolder}</>;
};

export default HandleInterceptorCodeCom;
