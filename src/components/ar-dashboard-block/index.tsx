import { ProCard } from '@ant-design/pro-components';
import { Tag } from 'antd';

function StatusIcon() {
  const status: number = 0;
  switch (status) {
    case 0:
      return <Tag color="success">success</Tag>;

    case 1:
      return <Tag color="processing">processing</Tag>;

    case 2:
      return <Tag color="error">error</Tag>;

    default:
      return <Tag color="default">default</Tag>;
  }
}
const DashBoardBlock = (props: { itemId: string; onClickProp: () => void }) => {
  const { itemId, onClickProp } = props;
  const onClick = () => {
    onClickProp();
  };
  // console.log('itemId', itemId);
  return (
    <>
      <ProCard
        title={`DeviceHeartbeat${itemId}`}
        extra={StatusIcon()}
        style={{ height: 180 }}
        hoverable
        bordered
        headerBordered
        onClick={onClick}
      >
        This is a description used to describe the purpose and usage of the
        component.
      </ProCard>
    </>
  );
};
export default DashBoardBlock;
