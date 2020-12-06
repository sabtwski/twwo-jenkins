import Song from '../../models/Song';
import { fetchSpotify } from './fetchSpotify';
import { HTTP_OK, HTTP_NO_CONTENT } from '../../constants/httpCodes';
import { extractSong } from '../../utils/spotifyData';
import { TRACK_TYPE } from '../../constants/spotify';

export const playSong = async (song: Song): Promise<Response> => {
  // https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
  return fetchSpotify('https://api.spotify.com/v1/me/player/play', 'PUT', {
    uris: [song.spotifyUri],
  });
};

/**
 * @returns [
 *  played or paused SONG if there are no errors, else null,
 *  TRACK_TYPE.SONG song is being played, TRACK_TYPE.PODCAST if podcast, else null
 *  true if SONG is being played, else false,
 *  error message
 * ]
 * @example
 *  nothing:
 *   [null, null, false, 'No Content']
 *  song:
 *   playing: [{...}, TRACK_TYPE.SONG, true,  '']
 *   stopped: [{...}, TRACK_TYPE.SONG, false, '']
 *   errored: [null , null false, 'Unauthorized']
 *  podcasts:
 *   playing: [null, TRACK_TYPE.PODCAST, true, '']
 *   stopped: [null, TRACK_TYPE.PODCAST, false, '']
 *   errored: [null, null, false, 'Unauthorized']
 *  other:
 *   [null, null, false, '']
 */
export const getNowPlaying = async (): Promise<
  [Song | null, TRACK_TYPE | null, boolean, string]
> => {
  const response = await fetchSpotify(
    'https://api.spotify.com/v1/me/player/currently-playing',
    'GET'
  );
  if (response.status === HTTP_NO_CONTENT) {
    return [null, null, false, response.statusText];
  }
  if (response.status !== HTTP_OK) {
    return [null, null, false, response.statusText];
  }

  const data = await response.json();
  if (data.currently_playing_type === TRACK_TYPE.SONG) {
    return [extractSong(data.item), TRACK_TYPE.SONG, data.is_playing, ''];
  }
  if (data.currently_playing_type === TRACK_TYPE.PODCAST) {
    return [null, TRACK_TYPE.PODCAST, data.is_playing, ''];
  }
  return [null, null, false, ''];
};
