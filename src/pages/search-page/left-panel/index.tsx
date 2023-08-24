import { PAGESIZE } from '@/constant';
import {
  getCurPageNumLocalStorage,
  setCurPageNumLocalStorage,
} from '@/utils/tools';
import { Avatar, List, Tag } from 'antd';
import { useEffect } from 'react';
import type { DataItemType, SearchData, SearchType } from '../typing';
// 状态码与状态的映射
const statusMap = new Map([
  [10, 'open'],
  [20, 'stage'],
  [30, 'pre_testing'],
  [40, 'production'],
  [50, 'post_testing'],
  [60, 'rollback'],
  [70, 'rollout'],
  [80, 'done'],
]);
const userName = 'Ella';
const desc =
  'I am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summaryI am a test summary';

export default function (props: {
  filterData: SearchType;
  searchData: SearchData;
  triggerRightPanel: (itemId: string) => void;
  onSearch: (currentPage: number, searchValues?: SearchType) => Promise<void>;
}) {
  const { filterData, searchData, triggerRightPanel, onSearch } = props;
  const triggerRightDetailPanel = (itemId: string) => {
    triggerRightPanel(itemId);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataComparer = (startTime, endTime, curTime) => {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const cur = new Date(curTime).getTime();
    console.log('startTime', start, 'endTime', end, 'curTime', cur);
    return cur <= end && cur >= start;
  };
  const makeDataSource = (allData: SearchData, filter?: SearchType) => {
    console.log('searchData result:', allData, filter);
    return allData?.searchResults.map((el) => {
      return {
        componentName: el.componentName,
        requestTag: el.requestId,
        segment: el.segment,
        version: el.version,
        status:
          filter && filter.status
            ? statusMap.get(
              el.configs.filter(
                (item) => item?.releaseState == filter.status,
              )[0]?.releaseState,
            )
            : el.configs
              .map((item) => statusMap.get(item.releaseState))
              .join(','),
        releaseTime: el.createTime,
        // releaseTime: el.configs
        //   .filter((item) => {
        //     return dataComparer(
        //       filter.startTime,
        //       filter.endTime,
        //       item.releaseTime,
        //     );
        //   })
        //   .join(','),
      };
    });
  };

  useEffect(() => {
    console.log('LeftPanel');
  }, []);
  return (
    <div
      className="leftPanel"
      style={{
        overflow: 'scroll',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <List<DataItemType>
        rowKey="requestTag"
        pagination={{
          size: 'small',
          onChange: (page) => {
            setCurPageNumLocalStorage(page);
            onSearch(page);
          },
          showQuickJumper: true,
          pageSize: PAGESIZE,
          current: getCurPageNumLocalStorage(),
          total: searchData?.numOfRecord ?? PAGESIZE,
          style: {
            margin: '0 5px',
          },
        }}
        dataSource={makeDataSource(searchData, filterData)}
        style={{ backgroundColor: '#fff' }}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => {
              triggerRightDetailPanel(item.componentName);
            }}
          >
            {/* <List.Item> */}
            <List.Item.Meta
              avatar={
                <div
                  style={{
                    marginLeft: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                  />
                  <h4
                    title={userName}
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                  >
                    {userName}
                  </h4>
                </div>
              }
              title={
                <div>
                  <span style={{ marginRight: '10px' }}>
                    {item.componentName}
                  </span>
                  {item.segment && <Tag color="blue">{item.segment}</Tag>}
                  <Tag color="#5BD8A6">{item.status}</Tag>
                </div>
              }
              description={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: '0 20px 0 0',
                  }}
                >
                  <span
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flexGrow: '1',
                      maxWidth: '90%',
                    }}
                  >
                    {desc}
                  </span>
                  <span>{item.releaseTime}</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
}
