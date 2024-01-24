import { Button, ButtonProps, Modal, ModalFuncProps } from 'antd';
import cx from 'classnames';

export interface IModalBtnProps {
  className?: string;
  children?: React.ReactNode;
  content?: React.ReactNode; // 弹窗内容
  modalMethod?: 'info' | 'success' | 'error' | 'warning' | 'confirm'; // 弹窗类型
  buttonProps?: ButtonProps;
  modalProps?: ModalFuncProps;
  onClick?: () => void;
  onOk?: () => void;
}

const ModalBtn = ({
  className = '',
  children = '删除',
  content = '删除数据后，数据无法恢复，是否删除？',
  modalMethod = 'confirm',
  buttonProps = {},
  modalProps = {},
  onOk,
  onClick,
}: IModalBtnProps) => {
  const [modal, contextHolder] = Modal.useModal();

  const handleClick = (e) => {
    e.stopPropagation();
    modal[modalMethod]({
      title: '提示',
      content: <div>{content}</div>,
      onOk: onOk,
      ...modalProps,
    });
  };

  return (
    <>
      <Button
        type='link'
        onClick={onClick || handleClick}
        className={cx('', className)}
        {...buttonProps}
      >
        {children}
      </Button>

      {contextHolder}
    </>
  );
};

export default ModalBtn;
