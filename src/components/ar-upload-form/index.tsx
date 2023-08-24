import { postCreateForm } from '@/services/request';
import { isOk } from '@/utils/show-tips';
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { Button, ConfigProvider, Form, Input, Select, Typography } from 'antd';
import locale from 'antd/locale/en_US';
import jsonFormat from 'json-format';
import { history } from '@umijs/max';
import { configJsonData } from './constant';
import './style.less';
import type { createFormType } from './typing';
import { useARUploadForm } from './useARUploadForm';
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18, offset: '2px' },
};

export const ARUploadForm = () => {
  // const [formdata, setFormData] = useState();
  const {
    errorText,
    jsonData,
    setCurrentRecoil,
    setErrorText,
    setJsonData,
    configData,
    setConfigData,
  } = useARUploadForm();
  const [form] = Form.useForm<createFormType>();
  const t = useTcsIntl();

  return (
    <ConfigProvider locale={locale}>
      <Form
        form={form}
        {...layout}
        layout="horizontal"
        colon={false}
        name="control-ref"
        style={{
          backgroundColor: '#fff',
          maxWidth: 1200,
          minWidth: 900,
          padding: '50px 0 0 50px',
          border: '2px solid #dfe1e6',
          position: 'relative',
        }}
        onFinish={async (values: createFormType) => {
          const formdata = {
            ...values,
            configs: configData,
            segment: values?.segment?.join(',') ?? '',
          };
          console.log('send form data:', formdata);
          try {
            const res = await postCreateForm(formdata);
            console.log('res', res);
            if (isOk(res?.data?.code || res?.status)) {
              setCurrentRecoil('1');
              history.push('/home');
            }
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <div
          style={{
            padding: '0 160px 0 0',
          }}
        >
          <Form.Item
            name="componentName"
            initialValue="TestComName4"
            rules={[
              { required: true, message: t('componentNameError1') },
              {
                validator: async (_, names) => {
                  if (names && names.length > 50) {
                    return Promise.reject(new Error(t('componentNameError2')));
                  }
                  if (names && !/^[a-z|A-Z]\w{0,49}$/g.test(names)) {
                    return Promise.reject(new Error(t('componentNameError3')));
                  }
                },
              },
            ]}
            label={<div className="formItem">{t('componentName')}</div>}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="version"
            initialValue="2.1.1"
            rules={[
              { required: true, message: t('versionError1') },
              {
                validator: async (_, item) => {
                  if (item && !/^[\d,.]*$/g.test(item)) {
                    return Promise.reject(new Error(t('versionError2')));
                  }
                },
              },
            ]}
            label={<div className="formItem">{t('version')}</div>}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="code"
            initialValue="fc1bb8bd13160a410895275e74c3fe2afe207842d0f81b33651d1481edf16eee"
            rules={[
              { required: true, message: t('codeError1') },
              {
                validator: async (_, item) => {
                  if (item && !/^\w*$/g.test(item)) {
                    return Promise.reject(new Error(t('codeError2')));
                  }
                },
              },
            ]}
            label={<div className="formItem">{t('code')}</div>}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="segment"
            rules={[{ required: false }]}
            label={<div className="formItem">{t('segment')}</div>}
          >
            <Select
              mode="multiple"
              placeholder={t('segmentTip')}
              className="select"
            >
              <Option value="Commercial">Commercial</Option>
              <Option value="Consumer">Consumer</Option>
              <Option value="CSWTechnicalDebt">CSW - Technical Debt</Option>
              <Option value="CSWInnovation">CSW - Innovation</Option>
              <Option value="Gaming">Gaming</Option>
              <Option value="bEducation">Education</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="fileUrl"
            initialValue="https://artifactory.tc.lenovo.com/artifactory/lenovo-release-generic/1.0.0.31/LenovoSecurityAddin.1.0.0.31.cab"
            rules={[{ required: true, message: t('fileUrlError') }]}
            label={<div className="formItem">{t('fileUrl')}</div>}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="ssrbTicket"
            initialValue="https://confluence.tc.lenovo.com/pages/viewpage.action?pageId=673547022"
            rules={[{ required: true, message: t('ssrbTicketError') }]}
            label={<div className="formItem">{t('ssrbTicket')}</div>}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="summary"
            initialValue="test"
            rules={[{ required: false }]}
            label={<div className="formItem">{t('summary')}</div>}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="sign"
            initialValue="papo_sign"
            label={<div className="formItem">{t('sign')}</div>}
            rules={[{ required: false }]}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="preRelease"
            initialValue="preRelease"
            label={<div className="formItem">{t('preRelease')}</div>}
            rules={[{ required: false }]}
          >
            <Input className="input" />
          </Form.Item>
          <Form.Item
            name="rollbackTag"
            initialValue="name:firstTestComName,version:1.1"
            label={<div className="formItem">{t('rollbackTag')}</div>}
          >
            <Input className="input" placeholder={t('rollbackTagTip')} />
          </Form.Item>

          <Form.Item
            name="configs"
            tooltip={t('configTip')}
            initialValue={JSON.stringify(configJsonData)}
            rules={[
              {
                required: jsonData.length === 0,
                message: t('configError'),
              },
            ]}
            label={<div className="formItem">{t('configs')}</div>}
          >
            <pre>
              <code>
                <Input.TextArea
                  rows={10}
                  name="configs"
                  // defaultValue={}
                  value={jsonData}
                  onChange={(event) => {
                    // 获取输入框的值
                    const inputValue = event.target.value;

                    try {
                      // 将输入框的值解析为 JSON 对象
                      const json = JSON.parse(inputValue);
                      setConfigData(json);
                      console.log('json:', json);
                      setErrorText('');
                      // 格式化 JSON 对象
                      const formattedJson = jsonFormat(json, {
                        type: 'space',
                        size: 2,
                      });
                      console.log(formattedJson);
                      // 更新 JSON 数据和输入框的值
                      setJsonData(formattedJson);
                      // console.log(jsonData)
                    } catch (error) {
                      setErrorText(error.message);
                      // JSON 解析失败，不进行格式化操作
                      setJsonData(inputValue);
                    }
                  }}
                  // onBlur={validConfig}
                />
                <div>
                  {errorText && (
                    <Typography.Text type="danger" code>
                      {errorText}
                    </Typography.Text>
                  )}
                </div>
              </code>
            </pre>
          </Form.Item>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
            marginRight: '160px',
          }}
        >
          <Button type="primary" htmlType="submit" style={{ margin: 20 }}>
            {t('create')}
          </Button>
          <a
            onClick={() => {
              history.push('/');
            }}
          >
            {t('cancel')}
          </a>
        </div>
      </Form>
    </ConfigProvider>
  );
};
