import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { Layout } from 'antd';
import { ARUploadForm } from '../ar-upload-form';
const { Header, Content, Footer } = Layout;
const CreateLayout = () => {
  const t = useTcsIntl();

  return (
    <Layout className="layout">
      <Header
        style={{
          backgroundColor: '#f4f5f7',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div style={{ fontWeight: '600', fontSize: '24px', color: '#172b4d' }}>
          {t('createTittle')}
        </div>
      </Header>
      <Content style={{ display: 'flex', justifyContent: 'center' }}>
        <>
          {/* {contextHolder} */}
          <ARUploadForm />
        </>
      </Content>
      <Footer style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ margin: '0 20px' }}>
          {t('autoReleaseProject')}
          (v8.20.18#820018-sha1:93f4a3c:i-0342fd1187dce68d8)
        </div>
        <a style={{ margin: '0 20px' }}>{t('about')}</a>
        <a style={{ margin: '0 20px' }}>{t('report')}</a>
      </Footer>
    </Layout>
  );
};

export default CreateLayout;
