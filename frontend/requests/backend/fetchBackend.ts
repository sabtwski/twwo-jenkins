import { BACKEND_BASE_URL } from '../../constants/urls';

export const fetchBackend = (
  path: string,
  method: string,
  body?: object | string,
): Promise<Response> => {
  const headers = {
    'Content-Type': 'application/json',
  };

  body = typeof body === 'string' ? body : JSON.stringify(body);

  return fetch(`${BACKEND_BASE_URL}${path}`, {
    method,
    headers,
    body,
  });
};
