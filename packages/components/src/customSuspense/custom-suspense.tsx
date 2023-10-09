import React from 'react';
import type { ReactNode } from 'react';
import { ErrorBoundary, useErrorBoundary, FallbackProps } from 'react-error-boundary';

import Skeleton, { SkeletonProps } from './skeleton';
import Spin, { SpinProps } from './spin';

export interface ICustomSuspenseProps {
  isLoading?: boolean; // 是否加载中(一般为第一次)
  loadingComProps?: SkeletonProps;
  isFetching?: boolean; // 是否请求中
  fetchingComProps?: SpinProps;
  isError?: boolean; // 是否失败（接口导致）
  error?: {
    message?: string;
    Fallback?: ReactNode; // 错误渲染的组件
    onReset?: () => void; // 重新按钮点击事件
  };
  children?: ReactNode;
}

const CustomSuspense = (props: ICustomSuspenseProps) => {
  const {
    isLoading = false,
    loadingComProps = {},
    isFetching = false,
    fetchingComProps = {},
    isError = false,
    error = {},
    children,
  } = props;

  const { showBoundary } = useErrorBoundary();

  if (isLoading) {
    return <Skeleton active {...loadingComProps} />;
  }

  // if (isFetching) {
  //   return <Spin {...fetchingComProps}>{children}</Spin>;
  // }

  if (isError) {
    showBoundary({ message: error.message ? error.message : '接口请求错误！' });
  }

  return (
    <Spin spinning={isFetching} {...fetchingComProps}>
      {children}
    </Spin>
  );
};

const Index = (props: ICustomSuspenseProps) => {
  const { isError, error: customError = {} } = props;

  function Fallback({ error, resetErrorBoundary }: FallbackProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    if (customError.Fallback) {
      return customError.Fallback;
    }

    return (
      <div role='alert'>
        <p>出了点问题:</p>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        {isError ? (
          customError.onReset && (
            <button
              onClick={() => {
                if (customError.onReset) {
                  customError.onReset();
                  resetErrorBoundary();
                }
              }}
            >
              重新请求
            </button>
          )
        ) : (
          <button onClick={resetErrorBoundary}>重新加载</button>
        )}
      </div>
    );
  }

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <CustomSuspense {...props} />
    </ErrorBoundary>
  );
};

export default Index;
