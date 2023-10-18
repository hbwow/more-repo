# `@hbwow/hooks`

> 1.x 版本基于 antd 4.x

> 2.x 版本基于 antd 5.x

## 使用

```BASH
npm i @hbwow/hooks
#
yarn i @hbwow/hooks
#
pnpm i @hbwow/hooks
```

## API

### useSearchAndTable

> 用于表格分页以及上面有条件筛选的场景；

```tsx
import { useSearchAndTable } from '@hbwow/hooks';

const { tableProps, paginationProps, defaultSearchFormValues, onreset, onChangeSearchFormValues } =
  useSearchAndTable({
    form: form,
    reactQuery: useHistoryQuery,
    columns: columns,
    defaultSearchFormValues: {
      fltNo: '',
      status: null,
      date: [dayjs(), dayjs()],
    },
    formatParams: (formValues) => {
      const nextFormValues = {
        ...formValues,
        startDate: formValues.date?.[0].format('YYYY-MM-DD'),
        endDate: formValues.date?.[1].format('YYYY-MM-DD'),
      };

      delete nextFormValues.date;

      return nextFormValues;
    },
  });

const handleSearch = async () => {
  const result = await form.validateFields();

  onChangeSearchFormValues({ ...result });
};

<Form form={form} initialValues={{ ...defaultSearchFormValues }}><From>

<Table {...tableProps} pagination={{ ...paginationProps }} />

<Button type='primary' ghost className='mr-8' onClick={onreset}>
  重置
</Button>;
```

#### IUseSearchAndTable

> 基本属性类型同 antd

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| storeKey | 用于全局缓存搜索条件，有则全局缓存，无则不需要缓存 (通常使用路由值，防止重复) | string | - |  |
| form | 表单 form | FormInstance<any> | - |  |
| columns | table columns | (ColumnGroupType<AnyObject> \| ColumnType<AnyObject>)[] | - |  |
| reactQuery | react query | (params: TQueryParams) => UseQueryResult<TData, TError> | - |  |
| defaultSearchFormValues | 默认的搜索表单数据（请填写完整，不然 重置 会出现部分没有重置） | TFormValue | - |  |
| defaultPagination | 默认的分页参数 | TPagination | - |  |
| defaultTableProps | 默认的表格 props | TableProps<any> | - |  |
| defaultPaginationProps | 默认分页 props | PaginationProps | - |  |
| formatParams | 表单数据 与 请求体不同的时候 调用该方法格式化 | (formValues: TFormValue) => TFormValue | - |  |
|  |  |  |  |  |

#### IUseSearchAndTableReturn

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| queryReturn | react query 所有的返回 | UseQueryResult<TData, TError> |  |  |
| tableProps | 表格 props | TableProps<any> |  |  |
| paginationProps | 分页 props | PaginationProps |  |  |
| defaultSearchFormValues | 默认的搜索表单数据 | TFormValue |  |  |
| onChangeSearchFormValues | 更改搜索表单数据 | (next: TFormValue) => void |  |  |
| onreset | 重置 | () => void |  |  |
|  |  |  |  |  |
