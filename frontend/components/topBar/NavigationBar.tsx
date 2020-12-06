import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';

import Colors from '../../constants/colors';
import SongDropdownSearch from '../../components/searching/SongDropdownSearch';
import { setLastChosenSong } from '../../utils/localStorage';
import Song from '../../models/Song';
import { getNowPlaying } from '../../requests/spotify/player';

type Props = { selectedMenuItem: number; dropdownSearchCallback?: (song: Song) => void };
const NavigationBar = ({ selectedMenuItem, dropdownSearchCallback }: Props): JSX.Element => {
  const SELECTED_MENU_ITEM_STYLE = { color: 'white', borderColor: 'white' };

  const { Header } = Layout;

  return (
    <div>
      <Header
        style={{
          width: '100%',
          backgroundColor: Colors.primaryColor,
          height: '67px',
        }}
      >
        <div
          className="logo"
          style={{
            maxWidth: '160px',
            float: 'left',
          }}
        >
          <img
            src="/spotify.svg"
            alt="Vercel Logo"
            className="logo"
            style={{
              width: '30px',
              height: '30px',
            }}
          />
          <span className="logoTitle">Spotify Lyrics</span>
        </div>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={[selectedMenuItem.toString()]}
          style={{
            backgroundColor: Colors.primaryColor,
            marginLeft: '60px',
            maxWidth: '600px',
            float: 'left',
          }}
        >
          <Menu.Item key={1} style={selectedMenuItem === 1 ? SELECTED_MENU_ITEM_STYLE : {}}>
            <Link href="/home">
              <a>Last played</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={2} style={selectedMenuItem === 2 ? SELECTED_MENU_ITEM_STYLE : {}}>
            <Link href="/favorites">
              <a>Favorites</a>
            </Link>
          </Menu.Item>

          <Menu.Item key={3} style={selectedMenuItem === 3 ? SELECTED_MENU_ITEM_STYLE : {}}>
            <Link href="/popular">
              <a>Statistics</a>
            </Link>
          </Menu.Item>
          <Menu.Item key={4} style={selectedMenuItem === 4 ? SELECTED_MENU_ITEM_STYLE : {}}>
            <Link href={{ pathname: '/song', query: { now: 'true' } }}>
              <a>Now played</a>
            </Link>
          </Menu.Item>
        </Menu>
        <div style={{ marginLeft: '10px', marginRight: 30, float: 'right' }}>
          <SongDropdownSearch
            onSelectCallback={song => {
              if (dropdownSearchCallback) {
                dropdownSearchCallback(song);
              } else {
                setLastChosenSong(song);
              }
            }}
          />
        </div>
      </Header>
      {/*<div>*/}
      {/*  <h2*/}
      {/*    style={{*/}
      {/*      color: 'white',*/}
      {/*      margin: 'auto',*/}
      {/*      width: '50%',*/}
      {/*      textAlign: 'center',*/}
      {/*      marginBottom: '10px',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    Seach lyrics of your favorite songs:*/}
      {/*  </h2>*/}
      {/*</div>*/}

      <style jsx>{`
        .logoTitle {
          color: black;
          margin-left: 10px;
          font-size: large;
          font-weight: bold;
        }

        :global(.ant-menu-item) {
          color: black;
          font-weight: bold;
        }

        :global(.ant-menu-item-active a) {
          color: white !important;
          font-weight: bold;
        }

        :global(.ant-menu-item-active) {
          border-color: white !important;
        }

        :global(.ant-menu-item-selected a) {
          color: white !important;
          font-weight: bold;
          // border-color: white !important;
        }

        :global(.ant-menu-item-selected) {
          border-color: white !important;
        }
      `}</style>
    </div>
  );
};

export default NavigationBar;
