import React from 'react';

import { UserData } from '../../hooks/auth'
import { UserThumb } from './style';

interface UserItemProps {
  user: UserData;
  placeholder: boolean;
}

const UserItem: React.FC<UserItemProps> = ({ user, placeholder, children }) => {
  return (
    <>
      {!placeholder
        ? (
          <UserThumb>
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

          </UserThumb>
        ) : (
          <UserThumb className="placeholder">
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

          </UserThumb>
        )}
    </>

  );
}

export default UserItem;
