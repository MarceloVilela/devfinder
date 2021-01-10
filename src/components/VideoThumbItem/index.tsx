import React from 'react';

import { VideoData } from '../../pages/Main'
import { Thumb } from './style';

interface ItemProps {
  video: VideoData;
  placeholder?: boolean;
}

const VideoThumbItem: React.FC<ItemProps> = ({ video, placeholder = false }) => {
  return (
    <>
      {!placeholder
        ? (
          <Thumb>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="thumb">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                />
              </div>

              <footer className='container-edge-spacing'>
                <div className='avatar'>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                  />
                </div>

                <div className='bio'>
                  <strong>{video.title}</strong>
                  <small>{video.channel}</small>
                </div>
              </footer>
            </a>
          </Thumb>
        )
        : (
          <Thumb className="placeholder">
            <div className="thumb">
            </div>

            <footer className='container-edge-spacing'>
              <div className='avatar'>
              </div>

              <div className='bio'>
                <p></p>
                <p></p>
              </div>
            </footer>

          </Thumb>
        )}
    </>
  );
}

export default VideoThumbItem;
