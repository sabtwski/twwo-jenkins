import { Track } from '../requests/spotify/fetchSpotify';
import Song from '../models/Song';

export const extractSong = (track: Track): Song => {
  return {
    title: track.name,
    artists: track.artists.map((artist: { name: string }) => artist.name),
    album: {
      title: track.album.name,
      albumBigCoverUrl: track.album.images[0].url,
      albumMediumCoverUrl: track.album.images[1].url,
      albumSmallCoverUrl: track.album.images[2].url,
      releaseDate: track.album.release_date,
    },
    popularity: track.popularity,
    spotifyUri: track.uri,
  };
};
