import React from 'react';

interface ContainerProps {
  backgroundUlr: string;
}

export const SongContainer: React.FC<ContainerProps> = props => {
  const { backgroundUlr, children } = props;
  return (
    <>
      <div className="song-container">{children}</div>

      <style jsx>{`
        .song-container {
          height: 600px;
          width: 600px;
          margin: auto;

          display: block;
          position: relative;
          cursor: pointer;

          background-image: url(${backgroundUlr});
          background-repeat: round;

          -webkit-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
          -moz-box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
          box-shadow: 9px 10px 35px 0px rgba(0, 0, 0, 0.5);
        }
        .song-container::before {
          content: '';
          background: linear-gradient(
            rgba(0, 0, 0, 0.5) 15%,
            rgba(0, 0, 0, 0) 90%,
            rgba(0, 0, 0, 0)
          );
          height: 100%;
          width: 100%;
          position: absolute;
          // border: 2px solid #181818;
          box-shadow: 0px 0px 10px white;
        }
      `}</style>
    </>
  );
};

// .song-container::after {
//   content: "";
//   background-image: url(${backgroundUlr});
//   opacity: 0.5;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   position: absolute;
//   z-index: -1;
//
