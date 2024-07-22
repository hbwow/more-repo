import cx from 'classnames';
import { RiMoreFill } from 'react-icons/ri';

import { Button, Tooltip, ButtonProps } from 'antd';

import './leftRightBtns.css';

type IBtns = (ButtonProps | React.ReactNode)[];

export interface ILeftRightBtnsProps {
  leftBtns?: IBtns;
  rightBtns?: IBtns;
  leftMaxLength?: number;
  className?: string;
}

const LeftRightBtns = ({
  leftBtns = [],
  rightBtns = [],
  leftMaxLength = 5,
  className,
}: ILeftRightBtnsProps) => {
  const render = (btns: IBtns, _type = 'normal') => {
    return btns.map((btnProps, index) => {
      const { className, type, ...rest } = btnProps as ButtonProps;

      const _className = cx(className, {
        'left-right-btns-ml-6': index !== 0 && _type === 'normal',
        'left-right-btns-mt-6': index !== 0 && _type === 'tooltip',
      });

      return btnProps?.$$typeof ? (
        <div key={`left-right-btn-${index}`} className={_className}>
          {btnProps as React.ReactNode}
        </div>
      ) : (
        <Button
          key={`left-right-btn-${index}`}
          type={_type === 'tooltip' ? 'text' : type}
          className={_className}
          {...rest}
        />
      );
    });
  };

  return (
    <div className={cx('left-right-btns-flex left-right-btns-justify-between', className)}>
      <div className='left-right-btns-flex left-right-btns-items-center'>
        {render(leftBtns.slice(0, leftMaxLength))}
        {leftBtns.length > leftMaxLength && (
          <Tooltip
            title={
              <div className='left-right-btns-flex left-right-btns-flex-col'>
                {render(leftBtns.slice(leftMaxLength), 'tooltip')}
              </div>
            }
            placement='bottom'
            color='#fff'
          >
            <Button className='left-right-btns-ml-6'>
              <RiMoreFill />
            </Button>
          </Tooltip>
        )}
      </div>
      <div className='left-right-btns-flex left-right-btns-items-center'>{render(rightBtns)}</div>
    </div>
  );
};

export default LeftRightBtns;
