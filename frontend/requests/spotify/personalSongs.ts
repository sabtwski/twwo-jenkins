import Song from '../../models/Song';
import { fetchSpotify, Track } from './fetchSpotify';
import { HTTP_OK } from '../../constants/httpCodes';
import { extractSong } from '../../utils/spotifyData';

const get20lastPlayedSongs = async (): Promise<[Song[], string]> => {
  let errorMessage = '';
  const songs: Song[] = [];

  const response = await fetchSpotify(
    'https://api.spotify.com/v1/me/player/recently-played',
    'GET'
  );
  if (response.status !== HTTP_OK) {
    errorMessage = response.statusText;
    return [songs, errorMessage];
  }

  const data = await response.json();
  data.items.forEach((item: { track: Track }) => {
    songs.push(extractSong(item.track));
  });

  return [songs, errorMessage];
};

export default get20lastPlayedSongs;
