import { Button, ButtonProps, Modal } from 'antd';
import cx from 'classnames';

export interface IDeleteBtnProps {
  children?: React.ReactNode;
  onClick?: () => void;
  onOk?: () => void;
  content?: React.ReactNode;
  className?: string;
  buttonProps?: ButtonProps;
}

const DeleteBtn = ({
  children = '删除',
  onClick,
  onOk,
  content = '删除数据后，数据无法恢复，是否删除？',
  className = '',
  buttonProps = {},
}: IDeleteBtnProps) => {
  const handleClick = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: '提示',
      content: <div>{content}</div>,
      onOk: onOk,
    });
  };

  return (
    <Button
      type='link'
      onClick={onClick || handleClick}
      className={cx('', className)}
      {...buttonProps}
    >
      {children}
    </Button>
  );
};

export default DeleteBtn;
