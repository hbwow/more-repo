import { CSSProperties } from 'react';
import cx from 'classnames';

import './fullBgImage.css';

export interface IFullBgImageProps {
  src?: string;
  className?: string;
  style?: CSSProperties;
}

const FullBgImage = ({
  src = 'https://stleointeriors.com/wp-content/uploads/2022/02/St.Leo-slider2.jpg',
  className = '',
  style = {},
}: IFullBgImageProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        ...style,
      }}
      className={cx('full-bg-image', className)}
    />
  );
};

export default FullBgImage;
