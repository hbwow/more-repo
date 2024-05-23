import { Typography, TypographyProps } from 'antd';
import cx from 'classnames';

import './requiredIcon.css';

const { Text } = Typography;

export interface IRequiredIconProps extends TypographyProps {
  className?: string;
  style: React.CSSProperties;
}

const RequiredIcon = ({ className = '', style = {}, ...rest }) => {
  return (
    <Text type='danger' className={cx('required-icon', className)} style={style} {...rest}>
      *
    </Text>
  );
};

export default RequiredIcon;
