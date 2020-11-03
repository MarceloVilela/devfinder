import React from 'react';

import { ChannelData } from '../../pages/ChannelDetail'
import './style.css';

interface ItemProps {
  item: ChannelData;
  placeholder: boolean;
}

const ChannelItem: React.FC<ItemProps> = ({ item, placeholder }) => {
  return (
    <>
      {!placeholder
        ? (
          <li>
            <div className="avatar">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={item.avatar ? item.avatar : 'https://yt3.ggpht.com/a/AATXAJzF6fuUyEFRBtZSpScb9M-Dq4QI6pyv0ic3pw=s100-c-k-c0xffffffff-no-rj-mo'}
                  alt={item.name}
                />
              </a>
            </div>

            <aside>
              <strong>{item.name}</strong>
              <small>{item.tags.join(", ")}</small>
            </aside>
          </li>
        ) : (
          <li className="placeholder">
            <div className="avatar">
            </div>

            <aside>
              <p></p>
              <p></p>
            </aside>
          </li>
        )}
    </>

  );
}

export default ChannelItem;
