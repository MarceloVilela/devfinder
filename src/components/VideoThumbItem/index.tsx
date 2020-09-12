import React from 'react';

import { VideoData } from '../../pages/Main'
import './style.css';

interface ItemProps {
  video: VideoData;
}

const VideoThumbItem: React.FC<ItemProps> = ({ video }) => {
  return (
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
  );
}

export default VideoThumbItem;
