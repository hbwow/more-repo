/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-08-30 17:40:09
 * @LastEditors: 冷开俊 lengkj@travelsky.com.cn
 * @LastEditTime: 2024-10-16 10:59:57
 * @FilePath: /more-repo/packages/utils/src/handleInterceptorCode/handleInterceptorCode.ts
 * @Description: 处理返回拦截code逻辑
 */

import { ModalFuncProps } from 'antd/lib/modal';
import { emitter } from '../utils/eventEmit';

export const EVENTS_NAME = '@hbwow/utils/handleInterceptorCode';

export interface IHandleCodeParams {
  code: number;
  message?: string;
  headers?: Record<string, any>;
  modalProps?: ModalFuncProps;
  modalPropsForTokenExpired?: ModalFuncProps;
  onErrorCallback?: () => void;
}

class HandleInterceptorCode {
  // token过期 code list
  public tokenExpiredCodes: number[];
  // 需要忽略的 code list
  public ignoreCodes: number[];
  // modal 默认配置
  private commonModalConfig = {
    closable: false,
    maskClosable: false,
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
    modalPropsForTokenExpired = {},
    onErrorCallback,
  }: IHandleCodeParams): boolean {
    if (headers['No-Notify-Message'] === 'Y') {
      return true;
    }

    const _message = message || '未知错误';

    if (this.tokenExpiredCodes.includes(code)) {
      emitter.emit(EVENTS_NAME, {
        modalMethod: 'error',
        modalDestroyAll: true,
        ...this.commonModalConfig,
        content: '登录已过期',
        okText: '去登录',
        onOk: () => {
          if (window) {
            window.location.href = '/login';
          }
        },
        ...modalPropsForTokenExpired,
      });

      // Modal.error({
      //   ...this.commonModalConfig,
      //   content: '登录已过期',
      //   okText: '去登录',
      //   onOk: () => {
      //     Modal.destroyAll();
      //     if (window) {
      //       window.location.href = '/login';
      //     }
      //   },
      //   ...modalPropsForTokenExpired,
      // });

      onErrorCallback?.();
      return false;
    }

    if (!this.ignoreCodes.includes(code)) {
      emitter.emit(EVENTS_NAME, {
        ...this.commonModalConfig,
        content: _message,
        ...modalProps,
      });

      // Modal.warning({
      //   ...this.commonModalConfig,
      //   content: _message,
      //   ...modalProps,
      // });

      onErrorCallback?.();
      return false;
    }

    return true;
  }
}

export default HandleInterceptorCode;
