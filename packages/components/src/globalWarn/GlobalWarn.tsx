import { AudioHTMLAttributes, CSSProperties } from 'react';
import cx from 'classnames';

import warnMp3 from './warn.mp3';

import './index.css';

export interface IGlobalWarnProps {
  className?: string;
  style?: CSSProperties;
  open?: boolean;
  audioProps?: AudioHTMLAttributes<HTMLAudioElement>;
}

const GlobalWarn = ({
  className = '',
  style = {},
  open = false,
  audioProps = {},
}: IGlobalWarnProps) => {
  return (
    open && (
      <div>
        <div className={cx('global-warn-animation', className)} style={{ ...style }} />
        {/* chrome 权限问题，音频需主动设置下 */}
        <audio autoPlay loop src={warnMp3} {...audioProps} />
      </div>
    )
  );
};

export default GlobalWarn;
