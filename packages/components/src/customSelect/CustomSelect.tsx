import { Select, SelectProps } from 'antd';

export interface ICustomSelectProps extends SelectProps {
  allField?: string | null;
}

const CustomSelect = ({
  allField = null,
  onChange,
  options = [],
  value,
  ...restProps
}: ICustomSelectProps) => {
  const ALL = 'ALL';

  return (
    <Select
      options={[{ value: ALL, label: '全部' }, ...options]}
      onChange={(_value, _option) => {
        if (restProps.mode === 'multiple') {
          //  最后选择的是 全部
          if (_value[_value.length - 1] === ALL) {
            onChange?.(allField, _option);
          } else {
            // 先选全部 后选其他的内容
            const findI = _value.indexOf(ALL);
            if (findI !== -1) {
              _value.splice(findI, 1);
            }
            onChange?.(_value, _option);
          }
          return;
        }

        // 单选
        onChange?.(_value === ALL ? allField : _value, _option);
      }}
      value={(() => {
        if (restProps.mode === 'multiple') {
          return value === allField ? [ALL] : value;
        }

        return value === allField ? ALL : value;
      })()}
      {...restProps}
    />
  );
};

export default CustomSelect;
