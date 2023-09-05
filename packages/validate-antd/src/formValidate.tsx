import { useContext } from 'react';
import { ConfigContext } from './configProvider';

import './formValidate.css';

interface IProps {
  message: string | null;
}

const FormError = ({ message }: IProps) => {
  const { icon } = useContext(ConfigContext);

  return (
    <div className='form-error'>
      {icon}
      <span>{message}</span>
    </div>
  );
};

const formValidate = (msg: string | void) => {
  if (!msg || msg === '') return Promise.resolve();
  return Promise.reject(<FormError message={msg} />);
};

export default formValidate;
