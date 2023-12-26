import { Button, ButtonProps, Modal, ModalFuncProps } from 'antd';
import cx from 'classnames';

export interface IDeleteBtnProps {
  children?: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onOk?: () => void;
  buttonProps?: ButtonProps;
  modalProps?: ModalFuncProps;
}

const ModalBtn = ({
  children = '删除',
  onClick,
  onOk,
  content = '删除数据后，数据无法恢复，是否删除？',
  className = '',
  buttonProps = {},
  modalProps = {},
}: IDeleteBtnProps) => {
  const handleClick = (e) => {
    e.stopPropagation();
    Modal.confirm({
      title: '提示',
      content: <div>{content}</div>,
      onOk: onOk,
      ...modalProps,
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

export default ModalBtn;
