import { memo } from 'react';
import type { ReactNode } from 'react';
import { Result, Button, ResultProps } from 'antd';

export interface IRouteAuthorizationProps {
  route?: Record<string, any>;
  pathname?: string;
  getRouteAuth?: (params: any) => boolean; // 可自定义校验方法
  pathField?: string; // 去和 pathname 匹配的字段
  childrenField?: string; // 去递归的字段
  resultProps?: ResultProps;
  children?: ReactNode;
}

const defaultRoute = {};
const defaultPathField = 'path';
const defaultChildrenField = 'children';

// 递归（这里递归了，参数要传递）
const _getRouteAuth = ({
  pathname,
  route = defaultRoute,
  pathField = defaultPathField,
  childrenField = defaultChildrenField,
}: Pick<
  IRouteAuthorizationProps,
  'pathname' | 'childrenField' | 'pathField' | 'route'
>): boolean => {
  if (Object.prototype.toString.call(route) === '[object Array]') {
    return route.some((r) => {
      if (r[pathField] === pathname) {
        return true;
      }

      if (r[childrenField]) {
        return _getRouteAuth({ pathname, route: r[childrenField], pathField, childrenField });
      }

      return false;
    });
  }

  if (Object.prototype.toString.call(route) === '[object Object]') {
    if (route?.[pathField] === pathname) {
      return true;
    }

    if (route?.[childrenField]) {
      return _getRouteAuth({ pathname, route: route[childrenField], pathField, childrenField });
    }

    return false;
  }

  return false;
};

const RouteAuthorization = ({
  pathname = '',
  getRouteAuth = _getRouteAuth,
  resultProps = {},
  route = defaultRoute,
  pathField = defaultPathField,
  childrenField = defaultChildrenField,
  children,
}: IRouteAuthorizationProps) => {
  const auth = getRouteAuth({ pathname, route, pathField, childrenField });

  if (auth) {
    return children;
  } else {
    return (
      <Result
        status='403'
        title='403'
        subTitle='对不起，您没有权限访问此页面。'
        extra={
          <Button
            type='primary'
            onClick={() => {
              window.location.href = '/';
            }}
          >
            回到首页
          </Button>
        }
        {...resultProps}
      />
    );
  }
};

export default RouteAuthorization;
