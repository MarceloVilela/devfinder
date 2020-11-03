import React from 'react';

import { UserData } from '../../hooks/auth'
import './style.css';

interface UserItemProps {
  user: UserData;
  placeholder: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ user, placeholder, children }) => {
  return (
    <>
      {!placeholder
        ? (
          <li>
            <div className="avatar">
              <img src={user.avatar} alt={user.name} />
            </div>

            <footer>
              <div className='bio'>
                <strong>{user.name}</strong>
                <small>{user.bio}</small>
              </div>

              {children}

            </footer>

          </li>
        ) : (
          <li className="placeholder">
            <div className="avatar">
              <div></div>
            </div>

            <footer>
              <div className='bio'>
                <p></p>
                <p></p>
              </div>

              {children}

            </footer>

          </li>
        )}
    </>

  );
}

export default UserItem;
