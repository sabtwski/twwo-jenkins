import { fetchBackend } from './fetchBackend';
import { Pageable } from './schema';
import { handleError } from './errorHandlers';
import { SongInternal } from '../../models/SongInternal';

export const registerUser = async (username: string): Promise<string> => {
  try {
    const response = await fetchBackend('/user/register', 'POST', username);
    return await response.json();
  } catch (e) {
    return handleError(e);
  }
};

export const fetchCheckedByUser = async (username: string, paging?: Pageable): Promise<SongInternal[] | string> => {
  const path = composePageablePath(`/user/${username}/checked`, paging);
  return await fetchGetResponse(path);
};

export const fetchUserFavourites = async (username: string, paging?: Pageable): Promise<SongInternal[] | string> => {
  const path = composePageablePath(`/user/${username}/favourites`, paging);
  return await fetchGetResponse(path);
};

const composePageablePath = (path: string, paging?: Pageable): string => {
  const pagingQuery = paging ? `?page=${paging.page}&size=${paging.size}&sort=${paging.sort.by},${paging.sort.order}` : '';
  return `${path}${pagingQuery}`;
};

const fetchGetResponse = async (path: string): Promise<SongInternal[] | string> => {
  try {
    const response = await fetchBackend(path, 'GET');
    return await response.json();
  } catch (e) {
    return handleError(e);
  }
};