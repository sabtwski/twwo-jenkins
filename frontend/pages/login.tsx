import Router from 'next/router';
import { useEffect } from 'react';

import { AUTH_ENDPOINT, CLIENT_ID, USER_ID_KEY } from '../constants/spotify';
import { APP_HOME_URL, APP_BASE_URL, APP_LOGIN_URL } from '../constants/urls';
import { extractAuthDataFromUrl } from '../utils/url';
import { saveToLocalStorage, getAccessToken, getUserId } from '../utils/localStorage';
import FullscreenSpinner from '../components/loading/FullscreenSpinner';
import Colors from '../constants/colors';
import { fetchBackend } from '../requests/backend/fetchBackend';
import { getUserInfo } from '../requests/spotify/user';

const Login: React.FC = () => {
  const accessScopes = [
    'user-read-playback-state',
    'streaming',
    'playlist-read-collaborative',
    'user-modify-playback-state',
    'user-read-private',
    'user-top-read',
    'user-read-currently-playing',
    'playlist-read-private',
    'user-read-recently-played',
    'user-library-read',
  ]; // https://developer.spotify.com/documentation/general/guides/scopes/
  const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${APP_LOGIN_URL}&scope=${accessScopes.join(
    '%20'
  )}&response_type=token&show_dialog=true`;

  useEffect(() => {
    (async () => {
      gatherUserInfo();
      fetchBackend('/user/register', 'POST', getUserId());
    })();
  }, []);

  const gatherUserInfo = async () => {
    if (Router.query.error !== undefined) {
      Router.push(APP_BASE_URL.replace('http:', '')); // Router doesn't accept protocol
    } else if (Router.asPath.includes('access_token=')) {
      saveToLocalStorage(extractAuthDataFromUrl(Router.asPath));
      getAccessToken() !== undefined && Router.push(APP_HOME_URL.replace('http:', ''));
    } else {
      Router.push(authUrl.replace('https:', ''));
    }
  };

  return (
    <body style={{ backgroundColor: Colors.backgroundColor }}>
      <FullscreenSpinner />
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: ${Colors.backgroundColor};
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </body>
  );
};

export default Login;
