import React, { useEffect, useState } from 'react';
import NavigationBar from '../components/topBar/NavigationBar';
import { Bar } from 'react-chartjs-2';
import colors, { chartColors } from '../constants/colors';
import get20lastPlayedSongs from '../requests/spotify/personalSongs';
import Song from '../models/Song';
import { fetchBackend } from '../requests/backend/fetchBackend';
import { SongInternal } from '../models/SongInternal';

const Popular: React.FC = () => {
  const FONT_COLOR = 'rgba(255, 255, 255, 0.9)';
  const GRID_COLOR = 'rgba(255, 255, 255, 0.2)';

  const [popularSongs, setPopularSongs] = useState<{ count: number; song: SongInternal }[]>([]);
  const [lastSongsLoadError, setLastSongsLoadError] = useState<string>('');
  useEffect(() => {
    (async () => {
      loadRecentSongsInfo();
    })();
  }, []);

  const loadRecentSongsInfo = async () => {
    const res = await fetchBackend('/statistics/checked', 'GET');
    const loadedSongs: { count: number; song: SongInternal }[] = await res.json();

    // tslint:disable-next-line: max-line-length
    const loadedSongsPrepared = loadedSongs
      .sort((s1, s2) => s2.count - s1.count)
      .slice(0, 5)
      .filter(s => s.count !== 0); // SORTING
    setPopularSongs(loadedSongsPrepared);
  };

  const data = {
    labels: popularSongs.map(s => s.song.title),
    datasets: [
      {
        data: popularSongs.map((s, i) => s.count),
        backgroundColor: chartColors.backgroundColor,
        borderColor: chartColors.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options: Chart.ChartOptions = {
    title: {
      display: true,
      position: 'top',
      text: 'Most checked out songs:',
      fontColor: FONT_COLOR,
      fontSize: 17,
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true, fontColor: FONT_COLOR },
          gridLines: { color: GRID_COLOR },
        },
      ],
      xAxes: [
        {
          ticks: { fontColor: FONT_COLOR },
          gridLines: { color: GRID_COLOR },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: v => {
          const tooltipSong: { count: number; song: SongInternal } = popularSongs.filter(s => {
            // return song.timesChecked === Number(v[0].value) && song.title === v[0].label;
            return s.song.title === v[0].label;
          })[0];
          return [tooltipSong.song.title, tooltipSong.song.artist, '', tooltipSong.song.album];
        },
      },
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      bodyFontColor: colors.backgroundColor,
      titleFontColor: colors.backgroundColor,
      multiKeyBackground: colors.backgroundColor,
    },
  };

  return (
    <div style={{ backgroundColor: colors.backgroundColor }}>
      <div>
        <NavigationBar selectedMenuItem={3} />
        <div style={{ marginLeft: '12vw', marginRight: '12vw', marginTop: '3vw' }}>
          {popularSongs.length ? <Bar data={data} options={options} /> : ''}
        </div>
      </div>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: ${colors.backgroundColor};
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Popular;
