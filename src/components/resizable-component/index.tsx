import {
  rollbackDisableReoil,
  showCreatePopupReoil,
  showRollbackPopupReoil,
} from '@/store/atom';
import { Modal } from 'antd';
import { Resizable } from 're-resizable';
import { useRecoilState } from 'recoil';
import './index.less';
import ARUploadForm from '../ar-upload-form/ArUploadForm';

const Splitter = () => {
  return <div className="splitter" />;
};

const ResizableLayout = (props: {
  top?: JSX.Element;
  leftPanel: JSX.Element;
  rightPanel?: JSX.Element;
  splitter?: JSX.Element;
  isSplit: boolean;
}) => {
  const {
    leftPanel,
    splitter = Splitter(),
    rightPanel = <></>,
    top = <></>,
    isSplit,
  } = props;
  const [isPopup, setIsPopup] = useRecoilState(showCreatePopupReoil);
  const [isShowRollbackPopup, setIsShowRollbackPopup] = useRecoilState(
    showRollbackPopupReoil,
  );
  const [rollbackDisable, setRollbackDisable] =
    useRecoilState(rollbackDisableReoil);
  return (
    <div className="resize-wrap">
      {top}
      <div className="re-layout">
        {isSplit ? (
          <>
            <Resizable
              className="left-resizer"
              defaultSize={{ width: '50%', height: '100%' }}
              enable={{
                right: true,
              }}
            >
              <div className="leftLayout">{leftPanel}</div>
            </Resizable>
            {splitter}
            {rightPanel}
          </>
        ) : (
          <>{leftPanel}</>
        )}
      </div>
      <div>
        <Modal
          title="Edit Order"
          open={isPopup}
          // onOk={handleModalOk}
          footer={null}
          onCancel={() => setIsPopup(false)}
          width={1200}
          bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
        >
          <ARUploadForm isPopup />
        </Modal>
        <Modal
          title="Rollback Version"
          open={isShowRollbackPopup}
          onOk={() => {
            setIsShowRollbackPopup(false);
            console.log('send rollback network');
            setRollbackDisable(!rollbackDisable);
          }}
          onCancel={() => setIsShowRollbackPopup(false)}
        >
          <p>Are you sure you want to rollback?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ResizableLayout;
