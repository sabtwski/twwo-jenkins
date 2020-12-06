export const extractAuthDataFromUrl = (
  url: string
): {
  access_token?: string;
  token_type?: string;
  expires_in?: string;
} => {
  // http://localhost:3000/home#access_token=<TOKEN>&token_type=Bearer&expires_in=3600

  const parameterSubstring = url.split('#')[1];
  // access_token=<TOKEN>&token_type=Bearer&expires_in=3600

  const parameters = parameterSubstring?.split('&');
  // [ "access_token=<TOKEN>", "token_type=Bearer", "expires_in=3600" ]

  const extractedData = {};
  parameters?.forEach(parameter => {
    const [key, value] = parameter.split('=');
    extractedData[key] = value;
  });

  return extractedData;
};
