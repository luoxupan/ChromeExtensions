import "./index.less";
import * as React from "react";
import { Utils } from '../../services';
import { Upload } from '../Upload';
import { Form, Button, Input, Switch, message, InputNumber, Select } from 'antd';

export function Proxy() {

  const [form] = Form.useForm();
  const formRef = React.useRef({} as any);

  const initData = async () => {
    try {
      // @ts-ignore
      const { rules } = await chrome.storage.sync.get(['rules']);
      form.setFieldsValue({ rules });
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
        <Form.List name="rules">
          {(fields, { add, remove }) => {
            if (!formRef.current.add) {
              formRef.current.add = add;
            }
            return (
              <>
                {fields.map((field, index) => {
                  return (
                    <div key={index} className="rules-list-item">
                      <Form.Item
                        label={'协议'}
                        name={[field.name, 'host']}
                        rules={[
                          { required: true, message: '输入host' },
                        ]}
                      >
                        <Select>
                          <Select.Option value="proxyForHttp">proxyForHttp</Select.Option>
                          <Select.Option value="proxyForHttps">proxyForHttps</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        label={'Host'}
                        name={[field.name, 'host']}
                        rules={[
                          { required: true, message: '输入host' },
                        ]}
                      >
                        <Input autoComplete="off" placeholder="127.0.0.1" />
                      </Form.Item>
                      <Form.Item
                        label={'Port'}
                        name={[field.name, 'port']}
                        rules={[
                          { required: true, message: '输入URL链接' },
                          { pattern: /^https?:\/\/.*$/i, message: '输入URL链接' }
                        ]}
                      >
                        <InputNumber autoComplete="off" placeholder="8080" />
                      </Form.Item>
                      <Form.Item
                        className='item-switch'
                        valuePropName='checked'
                        name={[field.name, 'enabled']}
                      >
                        <Switch />
                      </Form.Item>
                      <Button
                        className='del-row-btn'
                        onClick={() => {
                          remove(field.name);
                        }}
                      >
                        删除
                      </Button>
                    </div>
                  )
                })}
              </>
            )
          }}
        </Form.List>
      </Form>
      <div className="option-buttons">
        <Button
          className="add-button"
          onClick={() => {
            formRef.current.add({
              id: Utils.uuid(),
              enabled: false,
              RegExp_url: '',
              redirect_url: '',
              type: 'ResProxy'
            });
          }}
        >
          增加配置
        </Button>
        <Upload
          onChange={(data: any) => {
            form.setFieldsValue({ rules: data });
          }}
        />
        <Button
          onClick={async () => {
            const formData = await form.validateFields();
            Utils.DownloadJsonDataToLocal(formData.rules, 'ExtensionsConfig.json');
          }}
        >
          导出配置
        </Button>
        <Button
          type="primary"
          className="primary-button"
          onClick={async () => {
            const formData = await form.validateFields();
            console.log(formData);
            // @ts-ignore
            await chrome.storage.sync.set({ rules: formData.rules });
            message.success('规则已经生效');
          }}
        >
          生效
        </Button>
      </div>
    </div>
  );
}
