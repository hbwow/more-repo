import cx from 'classnames';
import { Tooltip, TooltipProps } from 'antd';

import './PartiallyTruncate.css';

interface ICommonProps {
  children?: React.ReactNode;
  className?: string;
}

export interface IPartiallyTruncateProps extends ICommonProps {}

export interface ITProps extends ICommonProps {
  tooltipProps?: TooltipProps | false;
}

export interface IDivProps extends ICommonProps {}

const T = ({ children, tooltipProps = {}, className = '' }: ITProps) => {
  return (
    <Tooltip title={tooltipProps === false ? '' : children} {...tooltipProps}>
      <div className={cx('hbwow-partially-truncate-t', className)}>{children}</div>
    </Tooltip>
  );
};

const Div = ({ children, className = '' }: IDivProps) => {
  return <div className={cx('hbwow-partially-truncate-div', className)}>{children}</div>;
};

const PartiallyTruncate = ({ children, className = '' }: IPartiallyTruncateProps) => {
  return <div className={cx('hbwow-partially-truncate', className)}>{children}</div>;
};

PartiallyTruncate.Div = Div;
PartiallyTruncate.T = T;

export default PartiallyTruncate;
