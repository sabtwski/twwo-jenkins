import Song from '../../models/Song';
import { fetchSpotify, Track } from './fetchSpotify';
import { HTTP_OK } from '../../constants/httpCodes';
import { extractSong } from '../../utils/spotifyData';

/**
 * Checks if song title contains unpleasant name to
 * search up for in Genius Lyrics
 * @param song examined song
 */
const filterPredicate = (song: Song): boolean => {
  const songLowercaseTitle: string = song.title.toLowerCase();
  const blacklist = ['remaster', 'live', 'version', 'anniversary', 'edit'];
  const regexps = [
    ['.*-.*', null, '.*'],
    ['.*\\(.*', null, '.*'],
  ];

  // Test with preceeding '-' and '('
  // return blacklist.every(word => {
  //   const re = new RegExp(`.*-.*${word}.*`);
  //   return re.test(songLowercaseTitle);
  // });
  for (let i = 0; i < blacklist.length; i += 1) {
    for (let j = 0; j < regexps.length; j += 1) {
      const re = new RegExp([regexps[j][0], blacklist[i], regexps[j][2]].join(''));
      if (re.test(songLowercaseTitle)) {
        return false;
      }
    }
  }
  return true;
};

const findSongs = async (query: string): Promise<[Song[], string]> => {
  const SEARCH_SCOPE = ['track']; // , 'artist', 'album'];
  const SONGS_PER_SCOPE = 15;
  const MAX_SONGS_RETURNED = 4;

  let errorMessage = '';
  const songs: Song[] = [];

  const response = await fetchSpotify(
    `https://api.spotify.com/v1/search?q=${query}&type=${SEARCH_SCOPE.join(
      ','
    )}&limit=${SONGS_PER_SCOPE}`,
    'GET'
  );
  if (response.status !== HTTP_OK) {
    errorMessage = response.statusText;
    return [songs, errorMessage];
  }
  const data = await response.json();

  data.tracks.items.forEach((track: Track) => {
    const song = extractSong(track);
    filterPredicate(song) && songs.push(song);
  });

  return [songs.slice(0, MAX_SONGS_RETURNED), errorMessage];
};

export default findSongs;
