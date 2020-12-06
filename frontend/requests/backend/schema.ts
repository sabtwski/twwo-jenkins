import { SongInternal } from '../../models/SongInternal';

export interface SongQuery {
  username: string;
  song: SongInternal;
}

export interface BackendSongResponse {
  song: SongInternal;
  favourite: boolean;
  status?: number;
}

export interface Pageable {
  page: number;
  size: number;
  sort: Sort;
}

export interface Sort {
  by: string;
  order: 'asc' | 'desc';
}
