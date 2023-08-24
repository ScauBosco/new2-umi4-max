export const setCurPageNumLocalStorage = (page: number) => {
  return window.localStorage.setItem('curPageNum', page + '');
};
export const getCurPageNumLocalStorage = () => {
  return parseInt(window.localStorage.getItem('curPageNum'));
};
export const dateFormatYMD = (date: Date) => {
  return date.toISOString().slice(0, 10).replace(/-/g, '-');
};
