import { atom, selector } from 'recoil';

export const selecteProjectState = atom<string | null>({
  key: 'homeState',
  default: null,
});

export const languageRecoil = atom<string>({
  key: 'language',
  default: 'en',
});

export const isShowTestRecoil = atom<boolean>({
  key: 'isShowTestRecoil',
  default: false,
});

export const setNumRecoil = atom<number>({
  key: 'setNumRecoil',
  default: 0,
});

export const mySelector = selector({
  key: 'MySelector',
  get: ({ get }) => get(setNumRecoil) + 1,
});

export const pageCurrentReoil = atom<string>({
  key: 'pageCurrentReoil',
  default: '1',
});

export const showCreatePopupReoil = atom<boolean>({
  key: 'showCreatePopupReoil',
  default: false,
});
export const showRollbackPopupReoil = atom<boolean>({
  key: 'showRollbackPopupReoil',
  default: false,
});
export const rollbackDisableReoil = atom<boolean>({
  key: 'rollbackDisableReoil',
  default: false,
});
export const detailDataReoil = atom<any>({
  key: 'detailDataReoil',
  default: null,
});
