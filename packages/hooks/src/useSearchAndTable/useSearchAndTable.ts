import { useEffect, useMemo, useState } from 'react';
import { UseQueryResult } from '@tanstack/react-query';

import type { TableProps, PaginationProps, FormInstance } from 'antd';
import type { ColumnGroupType, ColumnType, ColumnsType } from 'antd/es/table';

const PAGE_SIZE_OPTIONS = [10, 15, 20];

import { create } from 'zustand';

// global store
const useStore = create<{ globalState: any; setGlobalState: (nextData: any) => any }>((set) => ({
  globalState: {},
  setGlobalState: (nextData) =>
    set((state) => ({ globalState: { ...state.globalState, ...nextData } })),
}));

interface IFieldNames {
  page?: string; // page 字段
  pageSize?: string; // pageSize 字段
  dataSource?: string; // res -- dataSource 字段
  total?: string; // res --  total 字段
  current?: string; // res -- page 字段
  size?: string; // res -- pageSize 字段
}
const defaultFieldNames: IFieldNames = {
  page: 'page',
  pageSize: 'size',
  dataSource: 'records',
  total: 'total',
  current: 'current',
  size: 'size',
};

interface IUseSearchAndTable<TQueryParams, TData, TError, TFormValue, TPagination> {
  storeKey?: string; // 用于全局缓存搜索条件，有则全局缓存，无则不需要缓存 (通常使用路由值，防止重复)
  fieldNames?: IFieldNames; // 自定义节点字段
  form?: FormInstance<any>; // 表单 form
  columns: Record<string, any>[]; // table columns
  // reactQuery: (params: TQueryParams) => UseQueryResult<TData, TError>; // react query
  reactQuery: (params: TQueryParams) => any; // react query
  defaultSearchFormValues?: TFormValue; // 默认的搜索表单数据（请填写完整，不然 重置 会出现部分没有重置）
  defaultPagination?: TPagination | false; // 默认的分页参数  false：不需要分页的场景
  defaultTableProps?: Record<string, any>; // 默认的表格 props
  // defaultTableProps?: TableProps<RecordType>; // 默认的表格 props
  defaultPaginationProps?: PaginationProps; // 默认分页 props
  formatParams?: (formValues: TFormValue) => TFormValue; // 表单数据 与 请求体不同的时候 调用该方法格式化
}

interface IUseSearchAndTableReturn<TData, TError, TFormValue> {
  queryReturn: UseQueryResult<TData, TError>; // react query 所有的返回
  tableProps: Record<string, any>; // 表格 props
  // tableProps: TableProps<RecordType>; // 表格 props
  paginationProps: PaginationProps; // 分页 props
  defaultSearchFormValues: TFormValue; // 默认的搜索表单数据
  onChangeSearchFormValues: (next: TFormValue) => void; // 更改搜索表单数据
  onreset: () => void; // 重置
}

const useSearchAndTable = <
  TQueryParams = unknown,
  TData = unknown,
  TError = unknown,
  TFormValue = unknown,
  TPagination = unknown,
>({
  storeKey,
  fieldNames = {},
  form,
  columns,
  reactQuery,
  defaultSearchFormValues = {} as TFormValue,
  defaultPagination = {} as TPagination,
  defaultTableProps = {},
  defaultPaginationProps = {},
  formatParams,
}: IUseSearchAndTable<
  TQueryParams,
  TData,
  TError,
  TFormValue,
  TPagination
>): IUseSearchAndTableReturn<TData, TError, TFormValue> => {
  const globalState = useStore((state) => state.globalState);
  const setGlobalState = useStore((state) => state.setGlobalState);

  const _fieldNames = {
    ...defaultFieldNames,
    ...fieldNames,
  };

  const _defaultPagination =
    defaultPagination === false
      ? {}
      : {
          [_fieldNames.page as string]: 1,
          [_fieldNames.pageSize as string]: 10,
          ...defaultPagination,
        };

  const defaultParams = { ...defaultSearchFormValues, ..._defaultPagination } as TQueryParams;

  const defaultIncludeGlobalParams = storeKey
    ? { ...defaultParams, ...globalState[storeKey] }
    : { ...defaultParams };

  const [params, setParams] = useState<TQueryParams>(defaultIncludeGlobalParams);

  // 类似中间件 存一次在全局
  useEffect(() => {
    if (storeKey) {
      setGlobalState({ [storeKey]: params });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, storeKey]);

  const curParams = useMemo(() => {
    if (formatParams) {
      return formatParams(params as TFormValue);
    }

    return params;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // const q = reactQuery(params);
  const q = reactQuery(curParams);
  const { isFetching, data, remove } = q;

  const tableProps = {
    loading: isFetching,
    dataSource: data?.[_fieldNames.dataSource as string],
    columns: columns,
    ...defaultTableProps,
  };

  const paginationProps = {
    total: data?.[_fieldNames.total as string],
    current: data ? Number(data[_fieldNames.current as string]) : undefined,
    pageSize: data?.[_fieldNames.size as string],
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    onChange: (page: number, pageSize: number) => {
      setParams((old: TQueryParams) => ({
        ...old,
        [_fieldNames.page as string]: page,
        [_fieldNames.pageSize as string]: pageSize,
      }));
    },
    ...defaultPaginationProps,
  };

  const onreset = () => {
    remove?.(); // 防止存在缓存时，不发出请求

    form?.setFieldsValue(defaultParams);
    setParams(defaultParams);
  };

  const onChangeSearchFormValues = (next: TFormValue) => {
    remove?.(); // 防止存在缓存时，不发出请求
    return setParams({ ...params, ...next });
  };

  return {
    queryReturn: q,
    tableProps,
    paginationProps,
    defaultSearchFormValues: defaultIncludeGlobalParams,
    onChangeSearchFormValues,
    onreset,
  };
};

export default useSearchAndTable;
