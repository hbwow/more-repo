/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-08-30 17:40:09
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-09-18 11:04:49
 * @FilePath: /more-repo/packages/utils/src/handleInterceptorCode.ts
 * @Description: 处理返回拦截code逻辑
 */

import { Modal, ModalProps } from 'antd';

export interface IHandleCodeParams {
  code: number;
  message?: string;
  headers?: Record<string, any>;
  modalProps?: ModalProps;
  onErrorCallback?: () => {};
}

class HandleInterceptorCode {
  // token过期 code list
  public tokenExpiredCodes: number[];
  // 需要忽略的 code list
  public ignoreCodes: number[];
  // modal 默认配置
  private commonModalConfig = {
    closable: false,
    maskClosable: true,
    keyboard: false,
    okText: '知道了',
  };
  // 不需要弹窗提示
  static NO_NOTIFY_MESSAGE = { 'No-Notify-Message': 'Y' };

  constructor(
    { tokenExpiredCodes, ignoreCodes } = { tokenExpiredCodes: [401], ignoreCodes: [200] },
  ) {
    this.tokenExpiredCodes = tokenExpiredCodes;
    this.ignoreCodes = ignoreCodes;
  }

  handleCode({
    code,
    message,
    headers = {},
    modalProps = {},
    onErrorCallback,
  }: IHandleCodeParams): void {
    if (headers['No-Notify-Message'] === 'Y') {
      return;
    }

    const _message = message || '未知错误';

    if (this.tokenExpiredCodes.includes(code)) {
      Modal.error({
        ...this.commonModalConfig,
        content: '登录已过期',
        okText: '去登录',
        onOk: () => {
          Modal.destroyAll();
          if (window) {
            window.location.href = '/login';
          }
        },
        ...modalProps,
      });

      onErrorCallback?.();

      return;
    }

    if (!this.ignoreCodes.includes(code)) {
      Modal.warning({
        ...this.commonModalConfig,
        content: _message,
        ...modalProps,
      });

      onErrorCallback?.();

      return;
    }
  }
}

export default HandleInterceptorCode;
