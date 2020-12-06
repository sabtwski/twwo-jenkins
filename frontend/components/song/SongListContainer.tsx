import React from 'react';
import { Alert, Layout } from 'antd';
import Colors from '../../constants/colors';
import { SongList } from './SongList';
import { SongInternal } from '../../models/SongInternal';

const { Content } = Layout;

interface SongListContainerProps {
  title: string;
  songs: SongInternal[];
  error: string;
}

export const SongListContainer: React.FC<SongListContainerProps> = ({ title, songs, error }) => {
  return (
    <>
      <Layout className="layout" style={{ width: '100%' }}>
        <Content
          style={{
            padding: '0 50px',
            backgroundColor: Colors.backgroundColor,
            paddingTop: '2%',
            maxHeight: 'auto',
          }}
        >
          <h2 style={{ color: 'white', marginTop: '20px', marginLeft: '5%', fontSize: '21px' }}>
            {title}
          </h2>
          <div>
            <SongList songs={songs}/>
          </div>
        </Content>
        {error !== '' ? (
          <Alert type="error" message={`An error has occured! (${error})`} banner/>
        ) : (
          ''
        )}
      </Layout>
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: ${Colors.backgroundColor};
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
};
