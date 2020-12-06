import React, { ReactElement } from 'react';
import { Button, Layout } from 'antd';
import Link from 'next/link';

import Colors from '../constants/colors';

const { Header, Footer, Content } = Layout;

export default function Index(): ReactElement {
  return (
    <div className="container">
      <Layout className="layout" style={{ width: '100%' }}>
        <Header
          style={{
            width: '100%',
            backgroundColor: Colors.primaryColor,
          }}
        ></Header>
        <Content
          style={{
            padding: '0 50px',
            backgroundColor: Colors.backgroundColor,
            paddingTop: '2%',
            maxHeight: 'auto',
          }}
        >
          <div>
            <h1 className="title">Welcome to Spotify Lyrics!</h1>
            <p className="description">Find the lyrics of your favorite songs.</p>
            <Link href="/login">
              <Button
                type="primary"
                style={{
                  backgroundColor: Colors.primaryColor,
                  margin: 'auto',
                  display: 'block',
                  borderColor: Colors.primaryColor,
                  minHeight: '50px',
                  borderRadius: '500px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                }}
              >
                Sign in with Spotify
              </Button>
            </Link>
          </div>
          <img src="/walk.svg" alt="Music" className="music" />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
            backgroundColor: Colors.footerColor,
          }}
        >
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/spotify.svg" alt="Vercel Logo" className="logo" />
          </a>
        </Footer>
      </Layout>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
          color: white;
          text-shadow: 1px 1px 2px rgb(153, 153, 153);
          font-family: 'Roboto', sans-serif;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .music {
          margin: auto;
          display: block;
          max-width: 38%;
          padding-top: 3%;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          background-color: ${Colors.backgroundColor}
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
