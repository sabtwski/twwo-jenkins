import Album from '../models/Album';
import { SongInternal } from './SongInternal';

class Song {
  title: string;
  artists: string[];
  album: Album;
  popularity?: number;
  spotifyUri?: string;
  timesChecked?: number;
}

export const songInternalToSong = (songInternal: SongInternal): Song => {
  return {
    title: songInternal.title,
    artists: [songInternal.artist],
    album: {
      title: songInternal.album,
      albumBigCoverUrl: songInternal.photoUrl,
      albumMediumCoverUrl: songInternal.photoUrl,
      albumSmallCoverUrl: songInternal.photoUrl,
      releaseDate: songInternal.releaseYear.toString(),
    },
    spotifyUri: songInternal.spotifyUri,
  };
};
export default Song;
