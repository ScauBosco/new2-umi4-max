import logoPic from '@/public/lenovo.png';
import TranslateLogo from '@/public/navBarTranslate.png';
import { pageCurrentReoil } from '@/store/atom';
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getLocale, history, setLocale } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Avatar, Badge, ConfigProvider, Dropdown, Layout, Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useRecoilState } from 'recoil';
import './index.less';

export default function TCSLayout({ children }) {
  //   const [current, setCurrent] = useState('1');
  const [current, setCurrent] = useRecoilState(pageCurrentReoil);

  // const intl = useIntl();
  const t = useTcsIntl();
  const items: MenuProps['items'] = [
    {
      key: 'en-US',
      label: 'English',
    },
    {
      key: 'zh-CN',
      label: '中文',
    },
  ];
  const itemsHeader: MenuProps['items'] = [
    {
      label: `${t('Dashboard')}`,
      key: 'dashboard',
      icon: <MailOutlined />,
      onClick: () => history.push('/home'),
    },
    {
      label: `${t('Search')}`,
      key: 'search',
      icon: <AppstoreOutlined />,
      onClick: () => {
        history.push('/search');
      },
    },
    {
      label: `${t('Create')}`,
      key: 'create',
      icon: <SettingOutlined />,
      onClick: () => {
        history.push('/create');
      },
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    setLocale(key);
    console.log(key);
  };
  // const getLocale = intl.locale === 'en' ? localeEN : localeZH;
  return (
    <ConfigProvider locale={getLocale()}>
      {/* <ConfigProvider> */}
      <Layout style={{ minHeight: '100vh' }}>
        {/* Global header */}
        <div className="header-wrap">
          <Header className="header">
            <div className="headerLogo">
              <img className="logoPic" src={logoPic} />
              <a
                className="logoName"
                onClick={() => {
                  setCurrent('1');
                  history.push('/');
                }}
              >
                Auto Release
              </a>
            </div>
            <Menu
              className="headerMenu"
              mode="horizontal"
              items={itemsHeader}
              onClick={(e) => {
                setCurrent(e.key);
              }}
              selectedKeys={[current]}
            />
            <Dropdown menu={{ items, onClick }}>
              <img
                src={TranslateLogo}
                style={{ width: '22px', height: '22px' }}
              />
            </Dropdown>
            <Badge count={0}>
              <Avatar
                shape="square"
                icon={<UserOutlined />}
                style={{ margin: '0 20px 0 20px' }}
              />
            </Badge>
          </Header>
        </div>

        <Layout
          style={{
            marginTop: '50px',
          }}
        >
          {children}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
