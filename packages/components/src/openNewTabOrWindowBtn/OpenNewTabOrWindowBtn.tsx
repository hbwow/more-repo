import { Button, ButtonProps } from 'antd';

export interface IOpenNewTabOrWindowBtnProps extends ButtonProps {
  newWindow?: boolean;
  basename?: string;
}

export const handleOpenNewTabOrWindowBtn = (
  {
    href,
    basename,
    newWindow,
  }: Pick<IOpenNewTabOrWindowBtnProps, 'href' | 'newWindow' | 'basename'> = {
    href: '',
    basename: '',
    newWindow: false,
  },
) => {
  // 新开窗口
  if (newWindow) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
    window.open(`${basename}${href}`, 'newWindow', 'popup=true');
    // window.open(`${basename}${href}`, 'newWindow', 'width=800,height=600');

    return;
  }

  // 新开标签页
  window.open(`${basename}${href}`, '_blank');
};

const OpenNewTabOrWindowBtn = ({
  newWindow = false,
  basename = '',
  href,
  children,
  ...rest
}: IOpenNewTabOrWindowBtnProps) => {
  const handleClick = () => {
    handleOpenNewTabOrWindowBtn({ href, basename, newWindow });
  };

  return (
    <Button type='link' onClick={handleClick} {...rest}>
      {children}
    </Button>
  );
};

export default OpenNewTabOrWindowBtn;
