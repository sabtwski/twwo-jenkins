import React, { useState } from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';
import { deleteFromFavourite, markAsFavourite } from '../../requests/backend/song';
import { getUserId } from '../../utils/localStorage';
import { SongInternal } from '../../models/SongInternal';

interface AddToFavoriteProps {
  song: SongInternal;
  isFavourite: boolean;
  setIsFavourite: (isFavourite: boolean) => void
}

export const AddToFavorite: React.FC<AddToFavoriteProps> = ({ song, isFavourite, setIsFavourite }) => {

  const onClick = () => {
    const { id } = song;

    if (isFavourite) {
      deleteFromFavourite(getUserId(), id)
        .then(result => {
          if (result === 'succeed') {
            setIsFavourite(false);
          }
        });
    } else {
      markAsFavourite(getUserId(), id)
        .then(result => {
          if (result === 'succeed') {
            setIsFavourite(true);
          }
        });
    }
  };

  return (
    <Button
      className="song-button"
      shape="circle"
      size="large"
      style={{ marginLeft: 12, boxShadow: '2px 2px 6px #181818' }}
      icon={isFavourite ? <HeartFilled/> : <HeartOutlined/>}
      onClick={onClick}
      disabled={song == null}
    />
  );
};