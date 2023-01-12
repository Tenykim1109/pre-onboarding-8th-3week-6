import { Dispatch, SetStateAction } from 'react';

const fetchSick = async <T>(
  param: string,
  applyData?: (data: [T, Dispatch<SetStateAction<T>>]) => void
) => {
  const BASE_URL = process.env.REACT_APP_BASE_SEARCH_URL;
  const cacheStorage = await caches.open('search');
  const responsedCache = await cacheStorage.match(`${BASE_URL}${param}`);
  try {
    if (responsedCache) {
      responsedCache.json().then((res) => {
        applyData!(res);
      });
    } else {
      const response2 = await fetch(`${BASE_URL}${param}`);
      await cacheStorage.put(`${BASE_URL}${param}`, response2);
      fetchSick(param);
      console.log('api calling');
    }
  } catch (error) {
    alert(error);
  }
};

export default fetchSick;
