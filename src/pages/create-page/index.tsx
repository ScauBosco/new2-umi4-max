import CreateLayout from '@/components/create-component';
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { Layout } from 'antd';
import { useEffect } from 'react';
export default function ImportPage() {
  const t = useTcsIntl();
  // set web title
  useEffect(() => {
    document.title = t('create.title');
  }, [t]);
  return (
    <Layout>
      <CreateLayout />
    </Layout>
  );
}
