import cx from 'classnames';

import { Button, ButtonProps, Tooltip, TooltipProps } from 'antd';

import './tips.css';

export interface ITipsProps {
  tips?: React.ReactNode;
  icon?: React.ReactNode;
  defaultIconProps?: React.SVGProps<SVGElement>;
  buttonProps?: ButtonProps;
  tooltipProps?: TooltipProps;
}

const RiInformationLine = ({ fill = 'rgba(0,0,0,1)', ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='1.2em'
      height='1.2em'
      {...rest}
    >
      <path
        d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM11 7h2v2h-2V7Zm0 4h2v6h-2v-6Z'
        fill={fill}
      />
    </svg>
  );
};

const Tips = ({
  tips = '',
  icon,
  tooltipProps = {},
  buttonProps = {},
  defaultIconProps = {},
}: ITipsProps) => {
  const { className: classNameButton = '', ...restButton } = buttonProps;

  return (
    <Tooltip title={tips} {...tooltipProps}>
      <Button type='text' className={cx('tips-btn', classNameButton)} {...restButton}>
        {icon ? icon : <RiInformationLine {...defaultIconProps} />}
      </Button>
    </Tooltip>
  );
};

export default Tips;
