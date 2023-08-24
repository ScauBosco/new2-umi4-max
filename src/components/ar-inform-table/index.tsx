import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export interface DataType {
  componentName: string;
  requestTag: string;
  version: string;
  code: string;
  fileUrl: string;
  SSRBTicket: string;
  rollbackTag: string;
  key: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Component Name',
    dataIndex: 'componentName',
    key: 'componentName',
  },
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: 'Request Tag',
    dataIndex: 'requestTag',
    key: 'requestTag',
  },
  {
    title: 'code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'fileUrl',
    dataIndex: 'fileUrl',
    key: 'fileUrl',
  },
  {
    title: 'SSRBTicket',
    dataIndex: 'SSRBTicket',
    key: 'SSRBTicket',
  },
  {
    title: 'rollbackTag',
    dataIndex: 'rollbackTag',
    key: 'rollbackTag',
  },
];

export function InformTable(prop: { data: DataType[] }) {
  return (
    <Table
      columns={columns}
      dataSource={prop.data}
      sticky={true}
      scroll={{ y: '60vh', x: 1000 }}
      pagination={false}
    />
  );
}
