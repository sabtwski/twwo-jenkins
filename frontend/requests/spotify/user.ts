import { fetchSpotify } from './fetchSpotify';
import { HTTP_OK } from '../../constants/httpCodes';

/**
 * @returns [
 *  string ID of user,
 *  user has a PREMIUM account,
 *  ERROR message
 * ]
 * @example
 * HTTP_OK:
 *  Premium: ['musicaddict',    true,  '']
 *  Free:    ['musicsometimes', false, '']
 * ELSE:
 *  ['', false, response.statusText]
 */
export const getUserInfo = async (): Promise<[string, boolean, string]> => {
  const response = await fetchSpotify('https://api.spotify.com/v1/me', 'GET');
  if (response.status !== HTTP_OK) {
    return ['', false, response.statusText];
  }
  const data = await response.json();
  return [data.id, data.product === 'premium', ''];
};
