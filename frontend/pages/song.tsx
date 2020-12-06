import React, { useEffect, useState } from 'react';
import Song from '../models/Song';
import NavigationBar from '../components/topBar/NavigationBar';
import { fetchSong } from '../requests/backend/song';
import { SongQuery } from '../requests/backend/schema';
import { Button } from 'antd';
import { SongContainer } from '../components/song/SongContainer';
import { LyricsContainer } from '../components/song/LyricsContainer';
import { CaretRightOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons/lib';
import { SongInternal } from '../models/SongInternal';
import Colors from '../constants/colors';
import Router from 'next/router';

import { getLastChosenSong, getUserId, setLastChosenSong } from '../utils/localStorage';
import { playSong, getNowPlaying } from '../requests/spotify/player';
import { AddToFavorite } from '../components/buttons/AddToFavorite';

const SongView: React.FC<void> = () => {
  const [songWithLyrics, setSongWithLyrics] = useState<SongInternal>(null);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [checkedSong, setCheckedSong] = useState<Song>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (checkedSong === null || loaded) {
      if (Router.query.now) {
        getNowPlaying()
          .then(res => {
            setLastChosenSong(res[0]);
          })
          .catch(res => {
            setLastChosenSong(undefined);
          });
      }
      const lastSong = getLastChosenSong();
      setSongWithLyrics(null);
      setErrorMessage('');
      const buildSongQuery = (): SongQuery => {
        if (lastSong === null) {
          setErrorMessage('You are not playing anything now.');
          return null;
        }
        return {
          username: getUserId(),
          song: {
            title: lastSong.title,
            artist: lastSong.artists[0],
            album: lastSong.album['title'],
            spotifyUri: lastSong.spotifyUri,
            photoUrl: lastSong.album.albumBigCoverUrl,
            releaseYear: Number(lastSong.album.releaseDate.split('-')[0]),
          },
        };
      };

      setCheckedSong(lastSong);

      fetchSong(buildSongQuery()).then(result => {
        if (result.status === 404) {
          setErrorMessage("Unfortunetly we couldn't find lyrics for this song.");
        }
        if (result.status === 500) {
          setErrorMessage('Not cool. Number of this error is 500...');
        }
        if (typeof result === 'string') {
          setErrorMessage(result);
        } else {
          setLoaded(true);
          const { favourite, song } = result;
          setIsFavourite(favourite);
          setSongWithLyrics(song);
        }
      });
    }
  }, [JSON.stringify(checkedSong), Router.query.now]);

  return (
    <>
      <NavigationBar
        selectedMenuItem={Router.query.now ? 4 : 5}
        dropdownSearchCallback={song => {
          setLastChosenSong(song);
          setCheckedSong(song);
        }}
      />
      <div style={{ marginTop: '20px' }} className="song-view-container">
        <SongContainer backgroundUlr={checkedSong?.album.albumBigCoverUrl}>
          <div
            style={{
              position: 'absolute',
              left: 15,
              top: 5,
            }}
          >
            <span className="song-title">{checkedSong?.title}</span>
            <span className="song-artist">{checkedSong?.artists[0]}</span>
            <span className="song-album" style={checkedSong ? { opacity: 1 } : { opacity: 0 }}>
              {checkedSong?.album.title} ({checkedSong?.album.releaseDate.split('-')[0]})
            </span>
          </div>

          <div className="song-operations">
            <Button
              className="song-button"
              shape="circle"
              size="large"
              style={{ boxShadow: '2px 2px 6px #181818' }}
              icon={<CaretRightOutlined />}
              onClick={() => playSong(checkedSong)}
            />
            <AddToFavorite
              song={songWithLyrics}
              isFavourite={isFavourite}
              setIsFavourite={setIsFavourite}
            />
          </div>

          <LyricsContainer song={songWithLyrics} errorMessage={errorMessage} />
        </SongContainer>
      </div>

      <style jsx>{`
        .song-title {
          font-size: xx-large;
          font-weight: bold;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
          display: block;
          text-shadow: 2px 2px 6px #181818;
        }

        .song-artist {
          font-size: x-large;
          font-weight: bold;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
          display: block;
          text-shadow: 2px 2px 6px #181818;
        }

        .song-album {
          font-size: large;
          color: white;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 580px;
          display: block;
          text-shadow: 2px 2px 6px #181818;
          font-style: italic;
        }

        .song-operations {
          position: absolute;
          left: 15px;
          bottom: 15px;
        }

        .song-button {
          margin-left: 20px;
        }

        :global(.ant-btn:hover) {
          color: white;
          background-color: #1db954;
          border-color: #737373;
        }

        :global(.ant-btn:focus) {
          color: white;
          background-color: #1db954;
          border-color: #737373;
        }

        .song-view-container {
          position: relative;
          right: 50px;
        }
      `}</style>

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
    </>
  );
};

export default SongView;
