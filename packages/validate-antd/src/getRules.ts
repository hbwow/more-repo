/*
 * @Author: hbwow lllengkaixin@gmail.com
 * @Date: 2023-09-04 11:06:44
 * @LastEditors: hbwow lllengkaixin@gmail.com
 * @LastEditTime: 2023-09-05 11:21:22
 * @FilePath: /more-repo/packages/validate-antd/src/getRules.ts
 * @Description: 统一 antd 校验规则
 */

import { useContext } from 'react';

import formValidate from './formValidate';
import { ConfigContext } from './configProvider';

type IGetRulesObj = Record<
  string,
  [() => { required: boolean; validator: (_: any, value: any) => Promise<void> }]
>;

const useGetRules = () => {
  const { rulesMap = {} } = useContext(ConfigContext);

  /**
   * @description:
   * @param {
   *  name: string; 规则名
   *  required?: boolean; 是否为必选字段
   *  optional?: boolean; 是否选填
   * }
   * @return {*}
   */
  const getRules = ({
    name,
    required = true,
    optional = false,
    extraData,
  }: {
    name: string;
    required?: boolean;
    optional?: boolean;
    extraData?: any;
  }) => {
    const obj: IGetRulesObj = {};

    Object.keys(rulesMap).forEach((key) => {
      obj[key] = [
        () => ({
          required: required,
          validator(_: any, value: any) {
            if (!value && optional) return Promise.resolve(); // 选填

            const msg = rulesMap[key](value);
            return formValidate(msg);
          },
        }),
      ];
    });

    return obj[name] || [];
  };

  return { getRules };
};

export default useGetRules;
