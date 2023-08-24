import { getSearchForm } from '@/services/request';

// 保存数据到本地存储中，带有过期时间
function saveDataToStorage(key, data, ttl) {
  const expiration = Date.now() + ttl;
  localStorage.setItem(key, JSON.stringify({ data, expiration }));
}

// 从本地存储中获取数据，如果数据已经过期则返回 null
function getDataFromStorage(key) {
  const value = localStorage.getItem(key);
  if (value) {
    const { data, expiration } = JSON.parse(value);
    if (expiration >= Date.now()) {
      return data;
    }
  }
  return null;
}

// 从服务器获取分页数据
async function fetchPageData(pageNumber, pageSize) {
  const response = await fetch(
    `/api/data?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );
  const data = await response.json();
  return data;
}

// 获取分页数据，优先从缓存中获取，如果缓存中没有数据或已经过期则从服务器获取
export async function getPageData(
  pageNumber: number,
  pageSize: number,
  ttl = 60 * 1000,
) {
  const cacheKey = `page-${pageNumber}-${pageSize}`;
  let data = getDataFromStorage(cacheKey);
  if (!data) {
    data = await getSearchForm({ currentPage: pageNumber, pageSize });
    saveDataToStorage(cacheKey, data, ttl);
  } else {
    // 如果数据已经过期，则重新从服务器获取数据，并更新缓存的过期时间
    const { expiration } = JSON.parse(localStorage.getItem(cacheKey));
    if (expiration < Date.now()) {
      data = await fetchPageData(pageNumber, pageSize);
      saveDataToStorage(cacheKey, data, ttl);
    }
  }
  return data;
}
