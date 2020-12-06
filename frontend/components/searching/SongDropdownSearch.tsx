import React, { useState, useRef, useCallback } from 'react';
import { Input, AutoComplete } from 'antd';
import Router from 'next/router';
import Link from 'next/link';
import _ from 'lodash';

import findSongs from '../../requests/spotify/findSongs';
import Song from '../../models/Song';

const searchResult = async (
  query: string
): Promise<[{ label: JSX.Element; value: string }[], string]> => {
  if (query.length === 0) {
    return [[], ''];
  }

  const [songs, error] = await findSongs(query);
  if (error !== '') {
    return [[], error];
  }
  return [
    songs.map((song: Song, index: number) => {
      const innerLabel = (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ marginTop: 'auto', marginBottom: 'auto' }}>
            <b>{song.title}</b>
            <br />
            {` ${song.artists.join(', ')}`}
          </span>
          <span>
            <img src={song.album.albumSmallCoverUrl} width={48} />
          </span>
        </div>
      );
      const label =
        Router.pathname === '/song' && !Router.query.now ? (
          innerLabel
        ) : (
          <Link href="/song">{innerLabel}</Link>
        );

      return { label, value: JSON.stringify(song) };
    }),
    '',
  ];
};

type Props = { onSelectCallback: (func: Song) => void };
const SongDropdownSearch = ({ onSelectCallback }: Props) => {
  const DEBOUNCE_DELAY = 500;

  const [query, setQuery] = useState<string>('');
  const [options, setOptions] = useState<{ label: JSX.Element; value: string }[]>([]);
  const [error, setError] = useState('');

  const onSelect = (value: string) => {
    const selectedSong: Song = JSON.parse(value);
    setQuery('');
    onSelectCallback(selectedSong);
  };

  // If you REALLY want to know what happens here:
  // https://stackoverflow.com/a/59184678
  const debouncedHandleSearchRef = useRef<() => Promise<void>>();
  debouncedHandleSearchRef.current = async () => {
    const [foundSongs, searchError] = await searchResult(query);
    setOptions(foundSongs);
    setError(searchError);
  };
  const handleSearch = useCallback(
    _.debounce(() => debouncedHandleSearchRef.current(), DEBOUNCE_DELAY),
    []
  );

  const errorNotice = [
    {
      label: (
        <div>
          <span style={{ color: 'red' }}>An error has occured! ({error})</span>
        </div>
      ),
      value: undefined,
    },
  ];
  return (
    <div style={{ display: 'flex' }}>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{
          width: '450px',
          // position: 'absolute',
          marginTop: '14px',
        }}
        options={error ? errorNotice : options}
        onSelect={onSelect}
        onSearch={handleSearch}
        onChange={setQuery}
        value={query}
      >
        {/* tslint:disable-next-line:max-line-length */}
        <Input.Search size="large" placeholder="Start typing song title..." enterButton />
      </AutoComplete>
      <style jsx>{`
        :global(.ant-input-search-button) {
          color: white;
          background-color: #181818;
          border-color: #1db954;
        }

        :global(.ant-input-search-button:hover) {
          color: white;
          background-color: #737373;
          border-color: #1db954;
        }
      `}</style>
    </div>
  );
};

export default SongDropdownSearch;
