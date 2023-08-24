/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { dateFormatYMD } from '@/utils/tools';
import { Button, DatePicker, Form, Input, Select } from 'antd';
import './style.less';

const { RangePicker } = DatePicker;
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};
const ARSearchBar = (prop: { filterConditions: (values: any) => void }) => {
  const t = useTcsIntl();
  const [form] = Form.useForm();
  const { filterConditions } = prop;
  const onFinish = (values: any) => {
    const { period, status } = values;
    //将status的状态码转换成整型
    if (status) {
      const intStatus = parseInt(status, 10);
      filterConditions({ ...values, status: intStatus });
    }
    if (period) {
      const startTime = dateFormatYMD(new Date(period[0].$d));
      const endTime = dateFormatYMD(new Date(period[1].$d));
      delete values.period;
      // console.log('serch consition：', { ...values, startTime, endTime });
      filterConditions({ ...values, startTime, endTime });
    } else {
      // console.log('serch consition：', { ...values });
      filterConditions(values);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  return (
    <Form
      form={form}
      {...layout}
      layout="inline"
      colon={false}
      name="control-ref"
      style={{
        backgroundColor: '#fff',
        border: '2px solid #dfe1e6',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="period"
        style={{ margin: '10px 25px 10px 0' }}
        label={t('Period')}
      >
        <RangePicker
          placeholder={[t('startTime'), t('endTime')]}
          style={{ width: '220px' }}
        />
      </Form.Item>
      <Form.Item name="status" label={t('status')}>
        <Select
          placeholder={t('statusTip')}
          className="select"
          style={{ width: '180px', marginRight: '10px' }}
          allowClear
        >
          <Option value="10">open</Option>
          <Option value="20">stage</Option>
          <Option value="30">pre_testing</Option>
          <Option value="40">production</Option>
          <Option value="50">post_testing</Option>
          <Option value="60">rollback</Option>
          <Option value="70">rollout</Option>
          <Option value="80">done</Option>
        </Select>
      </Form.Item>
      <Form.Item name="segment" label={t('segment')}>
        <Select
          style={{ width: '180px' }}
          // mode="multiple"
          placeholder={t('segmentTip')}
          className="select"
          allowClear
        >
          <Option value="Commercial">Commercial</Option>
          <Option value="Consumer">Consumer</Option>
          <Option value="CSW">CSW</Option>
          <Option value="CSWInnovation">CSW - Innovation</Option>
          <Option value="Gaming">Gaming</Option>
          <Option value="Education">Education</Option>
        </Select>
      </Form.Item>
      <Form.Item name="keyword" label={t('keyword')}>
        <Input style={{ width: '180px' }} />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'end',
          marginLeft: 'auto',
          paddingRight: '15px',
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
          {t('search')}
        </Button>
        <Button type="primary" htmlType="button" onClick={onReset}>
          {t('reset')}
        </Button>
      </div>
    </Form>
  );
};

export default ARSearchBar;
