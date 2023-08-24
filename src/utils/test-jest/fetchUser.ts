/**
 * 获取用户信息
 */
export const fetchUser = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'moji',
        age: 24,
      });
    }, 2000);
  });
};
