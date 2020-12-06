import { extractAuthDataFromUrl } from '../../utils/url';

test('Extract token value, type and expiration time from CORRECT url.', async () => {
  const url = 'http://localhost:3000/home#access_token=<TOKEN>&token_type=Bearer&expires_in=3600';

  expect(extractAuthDataFromUrl(url)).toMatchObject({
    access_token: '<TOKEN>',
    token_type: 'Bearer',
    expires_in: '3600',
  });
});

test('Extract token value and type from PARTIALLY CORRECT url.', async () => {
  const url = 'http://localhost:3000/home#token_type=Bearer&expires_in=3600';

  expect(extractAuthDataFromUrl(url)).toMatchObject({
    token_type: 'Bearer',
    expires_in: '3600',
  });
});

test('Return an empty object from url WITHOUT #.', async () => {
  const url = 'http://localhost:3000/hometoken_type=Bearer&expires_in=3600';

  expect(extractAuthDataFromUrl(url)).toMatchObject({});
});
