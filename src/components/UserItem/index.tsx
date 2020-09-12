import React from 'react';

import { UserData } from '../../hooks/auth'
import './style.css';

interface UserItemProps {
  user: UserData;
}

const UserItem: React.FC<UserItemProps> = ({ user, children }) => {
  return (
    <li key={user.user}>
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
  );
}

export default UserItem;
