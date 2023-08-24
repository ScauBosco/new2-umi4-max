import { defineConfig } from '@umijs/max';

const isProxy = true;

export default defineConfig({
  define: {
    'process.env.ISPROXY': isProxy,
  },
  title: 'project.title',
  routes: [
    {
      path: '/',
      redirect: '/tcs/automation/release/ui/home',
      exact: true,
    },
    {
      path: '/home',
      redirect: '/tcs/automation/release/ui/home',
      exact: true,
    },
    {
      path: '/tcs/automation/release/ui/home',
      exact: true,
      component: 'home-page',
      title: 'home.title',
    },
    {
      path: '/search',
      redirect: '/tcs/automation/release/ui/search/',
      exact: true,
    },
    {
      path: '/tcs/automation/release/ui/search',
      exact: true,
      component: 'search-page',
      title: 'search.title',
      name: 'search.title',
    },
    {
      path: '/create',
      redirect: '/tcs/automation/release/ui/create',
      exact: true,
    },
    {
      path: '/tcs/automation/release/ui/create',
      exact: true,
      component: 'create-page',
      title: 'create',
      name: 'create',
    },
    {
      path: '*',
      exact: true,
      component: 'not-found',
      title: 'NotFound',
      name: 'NotFound',
    },
  ],
  mfsu: {},
  // title: 'auto release platform',
  locale: {
    default: 'en-US',
    baseSeparator: '-',
    // useLocalStorage: false,
    title: true,
    baseNavigator: true,
    antd: true,
  },
  publicPath:
    process.env.NODE_ENV === 'production'
      ? // 'http://localhost:3000/':'/',
        'https://tools.naea1.uds-dev.lenovo.com/tcs/automation/release/ui/'
      : '/',
  proxy:
    process.env.NODE_ENV === 'development' && isProxy
      ? {
          '/automation-release-dashboard/**': {
            target:
              'https://tools.naea1.uds-dev.lenovo.com/tcs/automation/release/',
            changeOrigin: true,
            // pathRewrite: { '^/api': '' },
          },
        }
      : {},
});
