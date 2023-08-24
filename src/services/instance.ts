// Encapsulating axios request
import { showTips } from '@/utils/show-tips';
import { message } from 'antd';
import axios from 'axios';
import { baseURL, TIMEOUT } from './config';
// console.log("process.env.NODE_ENV === 'development'",process.env.NODE_ENV === 'development');
// console.log(" process.env.ISPROXY", process.env.ISPROXY);

const axiosIns =
  process.env.NODE_ENV === 'development' && process.env.ISPROXY
    ? axios.create()
    : axios.create({ baseURL, headers: {} });

axiosIns.defaults.timeout = TIMEOUT;
// axiosIns.defaults.withCredentials=true
axiosIns.interceptors.response.use(
  (response) => {
    const res = response.data;
    showTips(res?.code);
    return res;
  },
  (error) => {
    const { response } = error;
    if (response && response.status) {
      message.error(response.status ?? 'error');
    } else if (!response) {
      message.error('network connect/request error');
    }
    return Promise.reject(response);
  },
);

export default axiosIns;
