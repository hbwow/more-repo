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

interface IUseSearchAndTable<TQueryParams, TData, TError, TFormValue, TPagination> {
  form?: FormInstance<any>; // 表单 form
  columns: (ColumnGroupType<any> | ColumnType<any>)[] | ColumnsType<any>[]; // table columns
  // reactQuery: (params: TQueryParams) => UseQueryResult<TData, TError>; // react query
  reactQuery: (params: TQueryParams) => any; // react query
  defaultSearchFormValues?: TFormValue; // 默认的搜索表单数据（请填写完整，不然 重置 会出现部分没有重置）
  defaultPagination?: TPagination; // 默认的分页参数
  defaultTableProps?: TableProps<any>; // 默认的表格 props
  // defaultTableProps?: TableProps<RecordType>; // 默认的表格 props
  defaultPaginationProps?: PaginationProps; // 默认分页 props
  formatParams?: (formValues: TFormValue) => TFormValue; // 表单数据 与 请求体不同的时候 调用该方法格式化
}

interface IUseSearchAndTableReturn<TData, TError, TFormValue> {
  queryReturn: UseQueryResult<TData, TError>; // react query 所有的返回
  tableProps: TableProps<any>; // 表格 props
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
  reactQuery,
  defaultSearchFormValues = {} as TFormValue,
  defaultPagination = { page: 1, size: 10 } as TPagination,
  defaultTableProps = {},
  defaultPaginationProps = {},
  columns,
  form,
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

  const defaultParams = { ...defaultSearchFormValues, ...defaultPagination } as TQueryParams;

  const defaultIncludeGlobalParams = { ...defaultParams, ...globalState };

  const [params, setParams] = useState<TQueryParams>(defaultIncludeGlobalParams);

  // 类似中间件 存一次在全局
  useEffect(() => {
    setGlobalState(params);
  }, [params]);

  const curParams = useMemo(() => {
    if (formatParams) {
      return formatParams(params as TFormValue);
    }

    return params;
  }, [params]);

  // const q = reactQuery(params);
  const q = reactQuery(curParams);
  const { isFetching, data, remove } = q;

  const tableProps = {
    loading: isFetching,
    dataSource: data?.records,
    columns: columns,
    ...defaultTableProps,
  };

  const paginationProps = {
    total: data?.total,
    current: data?.current,
    pageSize: data?.size,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    onChange: (page: number, pageSize: number) => {
      setParams((old) => ({ ...old, page: page, size: pageSize }));
    },
    ...defaultPaginationProps,
  };

  const onreset = () => {
    remove();

    form?.setFieldsValue(defaultParams);
    setParams(defaultParams);
  };

  const onChangeSearchFormValues = (next: TFormValue) => {
    remove(); // 防止存在缓存时，不发出请求
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
