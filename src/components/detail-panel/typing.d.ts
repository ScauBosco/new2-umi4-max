export interface DetailDataType {
  itemId: string;
}
export type DetailType = {
  componentName: string;
  version: string;
  requestTag: string;
  code: string;
  segment: string;
  fileUrl: string;
  ssrbTicket: string;
  summary: string;
  approved_by_pa: number;
  approved_by_po: number;
  delayTime: number;
  rollbackTag: string;
  configCursor: number;
  currentReleaseState: number;
  configs: {
    configTag: string;
    configDetail: string;
    releaseState: number;
    releaseTime: string;
    type: number;
    delayTime: number;
  }[];
};

export type CommentsType = {
  commentTag: string;
  content: string;
  createTime: string;
};

export type HistoryType = {
  state: number;
  message: string;
  changeTime: string;
};

export interface DetailAllType {
  detail: DetailType;
  comments: CommentsType[];
  history: HistoryType[];
}
