import React, { useEffect, useState } from 'react';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import { getUserInfo } from '../requests/spotify/user';
import Song from '../models/Song';
import NavigationBar from '../components/topBar/NavigationBar';
import { getUserId, saveToLocalStorage } from '../utils/localStorage';
import { USER_ID_KEY } from '../constants/spotify';
import { SongListContainer } from '../components/song/SongListContainer';
import { spotifyToInternal } from '../utils/songRepresentationMapper';

const Home: React.FC = () => {
  const [lastSongs, setLastSongs] = useState<Song[]>([]);
  const [lastSongsLoadError, setLastSongsLoadError] = useState<string>('');

  useEffect(() => {
    (async () => {
      loadRecentSongsInfo();
      saveUserToLocalStorage();
    })();
  }, []);

  const loadRecentSongsInfo = async () => {
    const [loadedSongs, error] = await get20lastPlayedSongs();
    setLastSongs(loadedSongs);
    setLastSongsLoadError(error);
  };

  const saveUserToLocalStorage = async () => {
    if (!getUserId()) {
      const [id, accountType, error] = await getUserInfo();
      saveToLocalStorage({ [USER_ID_KEY]: id });
    }
  };

  return (
    <div className="container">
      <NavigationBar selectedMenuItem={1}/>
      <SongListContainer title="Last played songs" songs={lastSongs.map(spotifyToInternal)}
                         error={lastSongsLoadError}/>
    </div>
  );
};

export default Home;
