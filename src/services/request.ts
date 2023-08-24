import type { getSearchFormType, postFormType } from './config';
import axiosIns from './instance';

export async function getSearchForm(value: Partial<getSearchFormType>) {
  return axiosIns.get('/automation-release-dashboard/search', {
    params: value,
  });
}

export async function postCreateForm(value: postFormType) {
  return axiosIns.post('/automation-release-dashboard/request', value);
}

export async function getDetailService(value: { requestTag: string }) {
  return axiosIns.get('/automation-release-dashboard/detail', {
    params: value,
  });
}
export async function createCommentService(value: {
  requestTag: string;
  content: string;
}) {
  return axiosIns.post('/automation-release-dashboard/comment/create', value);
}

export async function deleteCommentService(value: {
  requestTag: string;
  commentTag: string;
}) {
  return axiosIns.delete('/automation-release-dashboard/comment/delete', {
    params: value,
  });
}

export async function approveToSubmitService(value: {
  requestTag: string;
  state: number;
}) {
  return axiosIns.put('/automation-release-dashboard/approve', value);
}
export async function postRollbackService(value: { requestTag: string }) {
  return axiosIns.post('/automation-release-dashboard/rollback', value);
}
