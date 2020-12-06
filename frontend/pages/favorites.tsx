import React, { useEffect, useState } from 'react';
import { SongInternal } from '../models/SongInternal';
import NavigationBar from '../components/topBar/NavigationBar';
import { SongListContainer } from '../components/song/SongListContainer';
import { fetchUserFavourites } from '../requests/backend/user';
import { getUserId } from '../utils/localStorage';

const Favorites: React.FC = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<SongInternal[]>([]);
  const [loadingError, setLoadingError] = useState<string>('');

  useEffect(() => {
    fetchUserFavourites(getUserId())
      .then(result => {
        if (typeof result === 'string') {
          setLoadingError(result);
        } else {
          setFavoriteSongs(result);
        }
      });
  }, []);

  return (
    <div className="container">
      <NavigationBar selectedMenuItem={2}/>
      <SongListContainer title="Favorites songs" songs={favoriteSongs} error={loadingError}/>
    </div>
  );
};

export default Favorites;