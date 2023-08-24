import type { createFormType } from '@/components/ar-upload-form/typing';

// Configuration file
export const BASE_URL =
  'http://10.176.114.158:8080/automation-release-dashboard';

export const baseURL = {
  development: 'http://10.176.109.10:8085/',
  staging: '1',
  production: 'https://tools.naea1.uds-dev.lenovo.com/tcs/automation/release/',
}[process.env.NODE_ENV || 'development'];
export const TIMEOUT = 10000;

export interface resDataType {
  code: string;
  data: any;
  message?: string;
}
export interface getSearchFormType {
  currentPage: number;
  pageSize: number;
  endTime: string;
  keyword: string;
  segment: string;
  startTime: string;
  status: number;
}
export type postFormType = Omit<createFormType, 'segment' | 'configs'> & {
  segment: string;
  configs: any;
};
