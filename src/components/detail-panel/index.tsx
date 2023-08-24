import DetailClose from '@/public/detail-close.png';
import DetailOther from '@/public/detail-other.png';
import {
  approveToSubmitService,
  createCommentService,
  deleteCommentService,
  getDetailService,
} from '@/services/request';
import {
  rollbackDisableReoil,
  showCreatePopupReoil,
  showRollbackPopupReoil,
} from '@/store/atom';
import { useTcsIntl } from '@/utils/tcs-intl/useTcsIntl';
import { ProDescriptions } from '@ant-design/pro-components';
import type { CollapseProps, MenuProps } from 'antd';
import { Collapse, Dropdown, Input, List, Modal, Steps, Tag } from 'antd';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import './index.less';
import type { CommentsType, DetailAllType } from './typing';
const { Panel } = Collapse;

function StatusIcon(status: number) {
  switch (status) {
    case 0:
      return <Tag color="success">create</Tag>;

    case 1:
      return <Tag color="processing">create</Tag>;

    case 2:
      return <Tag color="error">create</Tag>;

    default:
      return <Tag color="default">create</Tag>;
  }
}
function approveIcon(status: number) {
  switch (status) {
    case 0:
      return <Tag color="success">pass</Tag>;
    case 2:
      return <Tag color="error">reject</Tag>;
    default:
      return <Tag color="default">unknown</Tag>;
  }
}
const name = 'John';
// after have other useful data, omit it,and fix code file
const mockRequestTag = 'testComponentName1.2';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const comments = [
  {
    commentTag: '1',
    content:
      'This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.This is a comment.',
    createTime: '06/Jul/23 3:31 AM',
  },
  {
    commentTag: '2',
    content: 'This is a comment.',
    createTime: '07/Jul/23 1:52 AM',
  },
];

export function DetailPanel(props: {
  closePanel: () => void;
  requestTag: any;
}) {
  const { closePanel, requestTag } = props;
  const [commentData, setCommentData] = useState<string>('');
  const [allComments, setAllComments] = useState<CommentsType[]>([]);
  const [isTextAreaOpen, setTextAreaOpen] = useState<boolean>(false);
  const [isShowDeletePopup, setIsShowDeletePopup] = useState<boolean>(false);
  const setIsShowRollbackPopup = useSetRecoilState(showRollbackPopupReoil);
  const setCreateShow = useSetRecoilState(showCreatePopupReoil);
  const rollbackDisable = useRecoilValue(rollbackDisableReoil);
  const [detailData, setDetailData] = useState<DetailAllType>();
  const items: MenuProps['items'] = [
    {
      key: 'rollback',
      label: 'rollback',
      disabled: rollbackDisable,
      onClick: () => {
        setIsShowRollbackPopup(true);
      },
    },
    {
      key: 'edit',
      label: 'edit',
      onClick: () => setCreateShow(true),
    },
  ];

  /**
   * control panel onclose
   */
  const onClose = () => {
    closePanel();
  };
  const t = useTcsIntl();
  useEffect(() => {
    const request = async () => {
      console.log('requestTag', requestTag);

      const res = await getDetailService({
        requestTag: mockRequestTag,
      });
      const resDeatil: DetailAllType = res.data;
      console.log('res.data', resDeatil);
      setDetailData(resDeatil);
      setAllComments(resDeatil.comments);
    };
    request();
  }, [requestTag]);
  const deleteComment = async (requestTagData: string, commentTag: string) => {
    const res = await deleteCommentService({
      commentTag,
      requestTag: requestTagData,
    });
    console.log('res', res);
    if (res.data) {
      setAllComments(res.data);
    }
    setIsShowDeletePopup(false);
  };
  const editComment = () => {
    console.log('edit comment');
  };
  const createComment = async () => {
    console.log('commentData:', commentData);
    //send add comment request
    const res = await createCommentService({
      requestTag: mockRequestTag,
      content: commentData,
    });
    console.log('createCommentService', res.data);
    if (res.data) {
      setAllComments(res.data);
    }
    setTextAreaOpen(false);
    setCommentData('');
  };
  const handleOk = (commentTag: string) => {
    deleteComment(mockRequestTag, commentTag);
    setIsShowDeletePopup(false);
    // comments = comments.filter((item) => item.commentTag !== deletingCommentId);
    //send delete comment request
  };
  const handleCancel = () => {
    setIsShowDeletePopup(false);
  };

  const handlecommentDataChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCommentData(event.target.value);
  };
  const openTextArea = () => {
    console.log('create comment');
    setTextAreaOpen(true);
  };
  const approveToSubmit = async (requestTagData: string, state: number) => {
    console.log('requestTag', requestTagData);
    const res = await approveToSubmitService({
      requestTag: mockRequestTag,
      state,
    });
    console.log('approveToSubmit', res);
  };
  const stepItems = ['Created', 'In Process', 'Finished'].map((step, i) => {
    return {
      title: step,
      description: (
        <List
          size="small"
          dataSource={detailData?.history.filter((el) => el.state === i)}
          renderItem={(item, j) => (
            <List.Item key={`${step}-stepItems-${j}`}>
              <List.Item.Meta
                title={
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>{name}</div>
                    <div style={{ fontWeight: '400' }}>{item.changeTime}</div>
                  </div>
                }
              />
              {item.message}
            </List.Item>
          )}
        />
      ),
    };
  });

  const collapseItems: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Detail',
      children: (
        <ProDescriptions column={1}>
          <ProDescriptions.Item
            label="Status"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {StatusIcon(1)}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Author"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            John
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Segment"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {detailData?.detail?.segment}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Version"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {detailData?.detail?.version}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Project Administrator"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {approveIcon(0)}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Product Owner"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {approveIcon(0)}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Code"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {detailData?.detail?.code}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="SsrbTicket Url"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            <a
              style={{ color: '#0052cc' }}
              href={detailData?.detail?.ssrbTicket}
            >
              {detailData?.detail?.ssrbTicket}
            </a>
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="File Url"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            <a style={{ color: '#0052cc' }} href={detailData?.detail?.fileUrl}>
              {detailData?.detail?.fileUrl}
            </a>
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Rollback Tag"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {detailData?.detail?.rollbackTag}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            // span={2}
            labelStyle={{ width: 150 }}
            valueType="text"
            contentStyle={{
              maxWidth: '80%',
              marginLeft: 20,
              textAlign: 'justify',
            }}
            renderText={(_) => {
              return _ + _;
            }} //重复渲染文本两次
            label="Summary"
          >
            {detailData?.detail?.summary}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Config Cursor"
            labelStyle={{ width: 150 }}
            contentStyle={{ marginLeft: 20 }}
          >
            {detailData?.detail?.configCursor}
          </ProDescriptions.Item>
          <ProDescriptions.Item>
            <Collapse
              ghost
              style={{
                marginLeft: '-15px',
                marginBottom: '-30px',
                color: '#00000073',
              }}
            >
              <Panel header="Configs" key="configs">
                {detailData?.detail?.configs?.map((item, key) => {
                  const header = `Config ${key + 1}`;
                  const jsonItem = JSON.stringify(item, null, 2);
                  return (
                    <Collapse ghost key={item.configTag}>
                      <Panel header={header} key={item.configTag}>
                        <pre>
                          <code>{jsonItem}</code>
                        </pre>
                      </Panel>
                    </Collapse>
                  );
                })}
              </Panel>
            </Collapse>
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
    },
    {
      key: '2',
      label: 'Comment',
      children: (
        <div>
          <div className="add-comment" onClick={openTextArea}>
            {' '}
            <span>+</span> Add comment
          </div>
          {isTextAreaOpen && (
            <>
              <Input.TextArea
                rows={5}
                name="configs"
                // defaultValue={}
                value={commentData}
                onChange={handlecommentDataChange}
              />
              <div className="text-area-open">
                <span onClick={createComment}>Add</span>
                <span
                  onClick={() => {
                    setTextAreaOpen(false);
                    setCommentData('');
                  }}
                >
                  Cancel
                </span>
              </div>
            </>
          )}
          <div>
            {allComments.map((item) => {
              const header = (
                <>
                  <a href="#" style={{ color: '#0052cc' }}>
                    {name}
                  </a>
                  <span> added a comment - {item.createTime}</span>
                </>
              );
              return (
                <Collapse ghost key={item.commentTag}>
                  <Panel
                    header={header}
                    key={item.commentTag}
                    className="comment-collapse-style"
                  >
                    <div>{item.content}</div>
                    <div>
                      <span onClick={editComment}>Edit</span>
                      <span
                        onClick={() => {
                          setIsShowDeletePopup(true);
                        }}
                      >
                        Delete
                      </span>

                      <Modal
                        title="Delete Comment"
                        open={isShowDeletePopup}
                        onOk={() => handleOk(item.commentTag)}
                        onCancel={handleCancel}
                      >
                        <p>Are you sure you want to delete this comment?</p>
                      </Modal>
                    </div>
                  </Panel>
                </Collapse>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      key: '3',
      label: 'History',
      children: (
        <ProDescriptions>
          <ProDescriptions.Item>
            <Steps
              current={2}
              status="error"
              direction="vertical"
              items={stepItems}
            />
          </ProDescriptions.Item>
        </ProDescriptions>
      ),
    },
  ];

  return (
    <>
      <ProDescriptions
        style={{
          height: '100%',
          padding: '3% 3%',
          background: '#fff',
          overflowY: 'scroll',
        }}
        column={1}
        title={`ComponentName-${detailData?.detail?.requestTag ?? 'no-detail'}`}
        tooltip={`${t('DetailPageTooltip')}`}
      >
        <ProDescriptions.Item valueType="option">
          <Dropdown menu={{ items }}>
            <img src={DetailOther} style={{ width: '22px', height: '22px' }} />
          </Dropdown>
          <img
            src={DetailClose}
            style={{ width: '22px', height: '22px' }}
            onClick={onClose}
          />
        </ProDescriptions.Item>
        <div>
          <Collapse defaultActiveKey={['1']} ghost items={collapseItems} />
        </div>
        <ProDescriptions.Item
          style={{ display: 'flex', justifyContent: 'right' }}
        >
          <button
            className="approvalButton"
            onClick={() =>
              approveToSubmit(
                detailData?.detail?.requestTag,
                detailData?.detail?.currentReleaseState,
              )
            }
          >
            Approve
          </button>
        </ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
}
