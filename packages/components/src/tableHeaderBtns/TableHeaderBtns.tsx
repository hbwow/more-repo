import cx from 'classnames';
import { RiMoreFill } from 'react-icons/ri';

import { Button, Tooltip, ButtonProps } from 'antd';

import './tableHeaderBtns.css';

type IBtns = (ButtonProps | React.ReactNode)[];

export interface ITableHeaderBtnsProps {
  leftBtns?: IBtns;
  rightBtns?: IBtns;
  leftMaxLength?: number;
  className?: string;
}

const TableHeaderBtns = ({
  leftBtns = [],
  rightBtns = [],
  leftMaxLength = 5,
  className,
}: ITableHeaderBtnsProps) => {
  const render = (btns: IBtns, _type = 'normal') => {
    return btns.map((btnProps, index) => {
      const { className, type, ...rest } = btnProps as ButtonProps;

      const _className = cx(className, {
        'table-header-btns-ml-6': index !== 0 && _type === 'normal',
        'table-header-btns-mt-6': index !== 0 && _type === 'tooltip',
      });

      return btnProps?.$$typeof ? (
        <div className={_className}>{btnProps as React.ReactNode}</div>
      ) : (
        <Button
          key={index}
          type={_type === 'tooltip' ? 'text' : type}
          className={_className}
          {...rest}
        />
      );
    });
  };

  return (
    <div className={cx('table-header-btns-flex table-header-btns-justify-between', className)}>
      <div className='table-header-btns-flex table-header-btns-items-center'>
        {render(leftBtns.slice(0, leftMaxLength))}
        {leftBtns.length > leftMaxLength && (
          <Tooltip
            title={
              <div className='table-header-btns-flex table-header-btns-flex-col'>
                {render(leftBtns.slice(leftMaxLength), 'tooltip')}
              </div>
            }
            placement='bottom'
            color='#fff'
          >
            <Button className='table-header-btns-ml-6'>
              <RiMoreFill />
            </Button>
          </Tooltip>
        )}
      </div>
      <div className='table-header-btns-flex table-header-btns-items-center'>
        {render(rightBtns)}
      </div>
    </div>
  );
};

export default TableHeaderBtns;