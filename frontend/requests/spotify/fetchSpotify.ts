import { getTokenType, getAccessToken } from '../../utils/localStorage';

export type Track = {
  name: string;
  popularity: number;
  uri: string;
  artists: { name: string }[];
  album: { name: string; release_date: string; images: { url: string }[] };
};

export const fetchSpotify = (url: string, method: string, body?: object): Promise<Response> => {
  const headers: any = {
    'Content-Type': 'application/json',
    Authorization: `${getTokenType()} ${getAccessToken()}`,
  };

  return fetch(url, { method, headers, body: JSON.stringify(body) });
};
