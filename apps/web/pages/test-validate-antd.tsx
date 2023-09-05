import { Button, Form, Input } from 'antd';
import { useGetRules } from '@hbwow/validate-antd';

import 'antd/dist/antd.css';

const Test = () => {
  const [form] = Form.useForm();
  const { getRules } = useGetRules();

  return (
    <Form form={form} layout='vertical' autoComplete='off'>
      <Form.Item
        name='测试'
        label='test'
        rules={[
          ...getRules({ name: 'isEmpty' }),
          // ...getRules({ name: 'phone', optional: true }),
          // ...getRules({ name: 'idCard', optional: true }),
          ...getRules({ name: 'email', optional: true }),
          // ...getRules({ name: 'isEmptyIsPhone' }),
        ]}
      >
        <Input placeholder='input placeholder' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Test;
