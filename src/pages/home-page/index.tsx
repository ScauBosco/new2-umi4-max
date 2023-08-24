import ResizableLayout from '@/components/resizable-component';
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { useEffect, useState } from 'react';

import { DetailPanel } from '@/components/detail-panel';
import './index.less';
import LeftPanel from './left-panel';

export default function () {
  const t = useTcsIntl();
  const [isShow, setShow] = useState(false);
  const [detailId, setDetailId] = useState<string>('0');
  // set web title
  useEffect(() => {
    document.title = t('home.title');
  }, [t]);

  useEffect(() => {
    console.log('HomePage xuanranle');
  }, []);
  return (
    <ResizableLayout
      leftPanel={
        <LeftPanel
          triggerRightPanel={(itemId: string) => {
            setShow(true);
            setDetailId(itemId);
          }}
        />
      }
      rightPanel={
        <DetailPanel detailData={detailId} closePanel={() => setShow(false)} />
      }
      isSplit={isShow}
    />
  );
}
