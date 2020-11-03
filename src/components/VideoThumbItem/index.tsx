import React from 'react';

import { VideoData } from '../../pages/Main'
import './style.css';

interface ItemProps {
  video: VideoData;
  placeholder?: boolean;
}

const VideoThumbItem: React.FC<ItemProps> = ({ video, placeholder = false }) => {
  return (
    <>
      {!placeholder
        ? (
          <li>
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

          </li>
        )
        : (
          <li className="placeholder">
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

          </li>
        )}
    </>
  );
}

export default VideoThumbItem;
