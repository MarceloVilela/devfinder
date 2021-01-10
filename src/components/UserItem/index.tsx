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

            <aside>
              <div className='bio'>

                <header>
                  <strong>{user.name}</strong>
                  {children}
                </header>

                <small>{user.bio}</small>
              </div>
            </aside>

          </UserThumb>
        ) : (
          <UserThumb className="placeholder">
            <div className="avatar">
              <div></div>
            </div>

            <aside>
              <div className='bio'>

                <header>
                  <p></p>
                </header>

                <p></p>
              </div>
            </aside>

          </UserThumb>
        )}
    </>

  );
}

export default UserItem;
