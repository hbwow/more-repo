import { createContext } from 'react';

type IRules = Record<string, (value: any) => string>;

type IIcon = React.ReactNode;

interface IConfigContext {
  rulesMap?: IRules;
  icon?: IIcon;
}

interface IProps extends IConfigContext {
  children?: React.ReactNode;
}

const DefaultIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={16}
      height={16}
      className='icon'
      viewBox='0 0 1024 1024'
    >
      <path
        fill='#ED5B56'
        fillOpacity={0.96}
        d='M512 64c126.72 3.328 232.192 47.168 316.48 131.456C912.832 279.872 956.672 385.344 960 512c-3.328 126.72-47.168 232.192-131.52 316.48C744.192 912.832 638.72 956.672 512 960c-126.72-3.328-232.192-47.168-316.544-131.52C111.232 744.192 67.392 638.72 64 512c3.328-126.72 47.168-232.192 131.456-316.544C279.872 111.232 385.344 67.392 512 64zm0 192a55.168 55.168 0 0 0-43.008 19.008A58.24 58.24 0 0 0 453.952 320l23.04 256a34.048 34.048 0 0 0 34.944 31.04 33.664 33.664 0 0 0 23.552-8.576A36.16 36.16 0 0 0 546.944 576l23.04-256a57.984 57.984 0 0 0-15.04-44.992A55.36 55.36 0 0 0 511.936 256H512zm0 512c14.72-.64 26.88-5.632 36.48-15.04a47.872 47.872 0 0 0 14.528-35.968A49.536 49.536 0 0 0 512 665.984a49.664 49.664 0 0 0-51.008 51.008c0 14.72 4.8 26.688 14.464 36.032A54.528 54.528 0 0 0 512 768z'
      />
    </svg>
  );
};

// https://github.com/any86/any-rule
export const defaultRules = {
  // 不能为空
  isEmpty: (value: any): string => {
    if (!value) return '不能为空！';
    return '';
  },
  // 手机号(mobile phone)中国(严谨), 根据工信部2019年最新公布的手机号段
  phone: (value: string): string => {
    const reg = new RegExp(
      /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    );
    if (!reg.test(value)) return '请输入正确的手机号码！';
    return '';
  },
  // 身份证号, 支持1/2代(15位/18位数字)
  idCard: (value: any): string => {
    const reg = new RegExp(
      /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
    );
    if (!reg.test(value)) return '请输入正确的身份证号码！';
    return '';
  },
  // 邮箱
  email: (value: any): string => {
    const reg = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    if (!reg.test(value)) return '请输入正确的邮箱！';
    return '';
  },
  // 护照（包含香港、澳门）
  passport: (value: any): string => {
    const reg = new RegExp(/^[a-zA-Z]\w{4,15}$/);
    if (!reg.test(value)) return '请输入正确的护照！';
    return '';
  },
};

export const ConfigContext: React.Context<IConfigContext> = createContext({} as IConfigContext);

const ConfigProvider = ({ children, rulesMap = {}, icon = <DefaultIcon /> }: IProps) => {
  return (
    <ConfigContext.Provider value={{ rulesMap: { ...defaultRules, ...rulesMap }, icon }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
