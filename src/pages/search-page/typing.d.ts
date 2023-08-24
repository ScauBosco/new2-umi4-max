export type DataItemType = {
  requestTag: number;
  componentName: string;
  version: string;
  status: string;
  segment: string;
  releaseTime: string;
};

export type SearchType = {
  endTime: string;
  keyword: string;
  segment: string;
  startTime: string;
  status: number;
};

export interface SearchData {
  currentPage: number;
  numOfPage: number;
  numOfRecord: number;
  pageSize: number;
  searchResults: {
    createTime: string;
    componentName: string;
    configs: {
      configDetail: string;
      releaseState: number;
      releaseTime: string;
      type: number;
    }[];
    requestId: number;
    version: string;
    segment: string;
  }[];
}
