import Song from '../models/Song';
import { SongInternal } from '../models/SongInternal';

export const spotifyToInternal = (song: Song): SongInternal => {
  return {
    title: song.title,
    artist: song.artists[0],
    album: song.album.title,
    spotifyUri: song.spotifyUri,
    photoUrl: song.album.albumBigCoverUrl,
    releaseYear: Number(song.album.releaseDate.split('-')[0]),
  };
};