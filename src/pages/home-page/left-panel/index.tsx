import { useEffect } from 'react';
import DashBoardBlock from '../../../components/ar-dashboard-block';

export default function (props: {
  triggerRightPanel: (itemId: string) => void;
}) {
  const { triggerRightPanel } = props;
  const triggerDetailPanel = (itemId: string) => {
    triggerRightPanel(itemId);
  };

  useEffect(() => {
    console.log('LeftPanel xuanranle');
  }, []);
  return (
    <div className="left-panel">
      {new Array(4).fill(0).map((_, i) => {
        const key = 'DashBoardBlock-' + i;
        return (
          <DashBoardBlock
            key={key}
            itemId={i + ''}
            onClickProp={() => triggerDetailPanel(i + '')}
          />
        );
      })}
    </div>
  );
}
