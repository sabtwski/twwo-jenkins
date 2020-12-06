import React from 'react';
import FullscreenSpinner from '../loading/FullscreenSpinner';
import { SongInternal } from '../../models/SongInternal';
interface LyricsProps {
  song: SongInternal;
  errorMessage?: string;
}

export const LyricsContainer: React.FC<LyricsProps> = props => {
  const { song, errorMessage } = props;

  const formatLyrics = (lyrics: string) => {
    return lyrics.split('\n').map((sentence, i) => (
      <span key={i}>
        {sentence}
        <br />
      </span>
    ));
  };

  let content;
  if (errorMessage !== '') {
    content = errorMessage;
  } else if (song == null) {
    content = <FullscreenSpinner />;
  } else {
    content = <p>{formatLyrics(song.lyrics)}</p>;
  }

  return (
    <>
      <div className="lyrics-container" style={errorMessage ? { color: 'red' } : {}}>
        {content}
      </div>

      <style jsx>{`
        .lyrics-container {
          height: 550px;
          width: 550px;
          background-color: #333333;
          color: white;
          z-index: 1;
          overflow: scroll;
          text-align: center;
          position: relative;
          font-family: 'Roboto', sans-serif;
          font-size: 16px;
          left: 300px;
          padding-top: 10px;
          top: 130px;
          -webkit-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
          box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
};
