export interface SongInternal {
  id?: number;
  title: string;
  artist: string;
  album: string;
  spotifyUri: string;
  photoUrl: string;
  releaseYear: number;
  lyrics?: string;
}
