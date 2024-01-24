/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2024-01-24 15:35:03
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2024-01-24 16:50:05
 * @FilePath: /more-repo/packages/utils/src/handleInterceptorCode/handleInterceptorCodeCom.tsx
 * @Description: 因为直接静态方法使用Modal会导致拿不到context上下文，所以写个组件搭配使用
 */
import { useEffect } from 'react';

import { Modal, ModalFuncProps } from 'antd';

import { events } from '../utils/eventEmit';
import { EVENTS_NAME } from './handleInterceptorCode';

interface IModalProps extends ModalFuncProps {
  modalMethod?: 'info' | 'success' | 'error' | 'warning' | 'confirm'; // 弹窗类型
  modalDestroyAll?: boolean; // 销毁所有弹窗
}

const HandleInterceptorCodeCom = () => {
  const [modal, contextHolder] = Modal.useModal();

  useEffect(() => {
    events.on(
      EVENTS_NAME,
      ({ modalMethod = 'warning', modalDestroyAll, onOk, ...rest }: IModalProps) => {
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
      },
    );
  }, [modal]);

  return <>{contextHolder}</>;
};

export default HandleInterceptorCodeCom;
