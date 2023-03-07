import "./index.less";
import * as React from "react";
import { Form, Button, Input, Switch, message, InputNumber, Select } from 'antd';

export function Proxy() {

  const [form] = Form.useForm();
  const formRef = React.useRef({} as any);

  const initData = async () => {
    try {
      // @ts-ignore
      const { proxy } = await chrome.storage.sync.get(['proxy']);
      form.setFieldsValue(proxy);
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    initData();
  }, []);

  return (
    <div className="chrome-extensions-proxy">
      <Form form={form}>
        <Form.Item
          label={'协议'}
          name={'scheme'}
          rules={[
            { required: true, message: '选择协议' },
          ]}
        >
          <Select mode="multiple" placeholder="选择协议">
            <Select.Option value="proxyForHttp">proxyForHttp</Select.Option>
            <Select.Option value="proxyForHttps">proxyForHttps</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={'Host'}
          name={'host'}
          rules={[
            { required: true, message: '输入host' },
          ]}
        >
          <Input autoComplete="off" placeholder="127.0.0.1" />
        </Form.Item>
        <Form.Item
          label={'Port'}
          name={'port'}
          rules={[
            { required: true, message: '输入port' },
          ]}
        >
          <InputNumber autoComplete="off" placeholder="8080" />
        </Form.Item>
        <Form.Item
          className='item-switch'
          valuePropName='checked'
          name={'enabled'}
        >
          <Switch />
        </Form.Item>
      </Form>
      <div className="option-buttons">
        <Button
          type="primary"
          className="primary-button"
          onClick={async () => {
            const formData = await form.validateFields();
            console.log(formData);
            // @ts-ignore
            await chrome.storage.sync.set({ proxy: formData });
            message.success('规则已经生效');
          }}
        >
          生效
        </Button>
      </div>
    </div>
  );
}
